<template>
  <modal
    class="uploadPhoto"
    title="Upload Your Photos"
    @close="handleClose">

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
      <h3 class="upload__status">Uploading</h3>
      
      <scroll class="upload-body" :settings="{ suppressScrollX: true }">

        <figure class="upload-preview" v-if="photos.length" v-for="item in photos">

          <img class="upload-preview__thumbnail" :src="item.thumbnail" />

          <figcaption>
            <div class="upload-preview__name">
              <span>{{item.name}}</span>
              <i class="ion-close-round" />
            </div>

            <div class="upload-preview__progress">
              <span :style="{ width: `${item.progress}%` }" />
            </div>

            <div class="upload-preview__size">
              <span>{{ item.progress === 100 ? 'Completed' : `${item.progress}% done` }}</span>
              <span>{{byteToText(item.size)}}</span>
            </div>
          </figcaption>

        </figure>

        <div class="upload__placeholder" v-if="!photos.length">
          Nothing is Uploading
        </div>

      </scroll>
    </div>

    <template slot="footer">
      <button class="cancel" @click="handleClose">Cancel</button>
      <button class="submit" @click="uploadPhotos">Add to album</button>
    </template>

  </modal>  
</template>

<script>
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
    album: String,
    user: String,
  },
  data: () => ({
    photos: [],
  }),
  methods: {
    handleClose() {
      const { albumName } = this.$route.params;
      this.$router.replace({ name: 'AlbumPage', params: { albumName } });
    },

    byteToText(byte) {
      const kb = (byte / 1024).toFixed(1);
      const mb = (kb / 1024).toFixed(1);

      if (kb < 1024) {
        return `${kb} kb`;
      }

      return `${mb} mb`;
    },

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
              // for upload progress
              progress: 0,
            });
          };
        }
      }
    },
    uploadPhotos() {
      this.photos.forEach(this.uploadToStorage);
    },
    uploadToStorage({ file, name, ratio, color }, index) {
      const upload = storage.child(`images/${name}`).put(file);

      // upload progress
      upload.on('state_changed', ({ bytesTransferred, totalBytes }) => {
        const progress = Math.floor((bytesTransferred / totalBytes) * 100);
        // change photo progress
        this.photos[index].progress = progress;
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
      const { user, album } = this;

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
