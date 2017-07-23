<template>
  <modal
    title="Upload Your Photos"
    @close="closeModal('uploadPhoto')">

    <div class="dropzone">
      <input 
        class="dropzone__uploader" 
        type="file" 
        accept="image/*" 
        multiple
        @change="handleFileChange"
      />
      <div class="dropzone-description">
        <i class="ion-images" />
        <h3>Click here or drag and drop files.</h3>
      </div>
    </div>

    <div class="upload">

    </div>

    <template slot="footer">
      <button class="cancel" @click="closeModal('uploadPhoto')">Cancel</button>
      <button class="submit" @click="uploadPhotos">Add to album</button>
    </template>

  </modal>  
</template>

<script>
import { mapActions } from 'vuex';

import ColorThief from 'color-thief-standalone';

const colorThief = new ColorThief();


import firebase from '~helpers/firebase';

const storage = firebase.storage().ref();


import photos from '~helpers/api/photos';

const isFileImage = (fileName) => {
  const fileType = fileName.split('.').pop();

  if (fileType !== 'jpg'
    && fileType !== 'jpeg'
    && fileType !== 'gif'
    && fileType !== 'png') {
    return false;
  }
  return true;
};

export default {
  name: 'UploadPhotoModal',
  props: {
    data: {
      type: Object,
    },
  },
  data: () => ({
    photos: [],
  }),
  methods: {
    ...mapActions('modals', [
      'closeModal',
    ]),
    handleFileChange(e) {
      const { files } = e.target;

      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        const { name, size } = file;
        const thumbnail = URL.createObjectURL(file);

        if (isFileImage(name)) {
          const coverImage = new Image();
          coverImage.src = thumbnail;
          coverImage.onload = () => {
            const ratio = coverImage.width / coverImage.height;
            const colorArray = colorThief.getPalette(coverImage, 2);

            this.photos.push({
              file,
              name,
              size,
              thumbnail,
              ratio,
              color: [colorArray[0].join(','), colorArray[1].join(',')],
            });
          };
        }
      }
    },
    uploadPhotos() {
      this.photos.forEach(item => this.uploadToStorage(item));
    },
    uploadToStorage({ file, name, ratio, color }) {
      const upload = storage.child(`images/${name}`).put(file);

      // upload progress
      upload.on('state_changed', (snapshot) => {
        const { bytesTransferred, totalBytes } = snapshot;
        const progress = (bytesTransferred / totalBytes) * 100;
        console.log(progress);
      // error occured
      }, () => {
      // upload success
      }, () => {
        this.uploadToFirebase({
          name,
          ratio,
          color,
          url: upload.snapshot.downloadURL,
        });
      });
    },
    uploadToFirebase({
      name,
      ratio,
      color,
      url: src,
    }) {
      const { user, album } = this.data;

      photos.create({
        name,
        user,
        album,
        src,
        ratio,
        color,
      });
    },
  },
};
</script>
