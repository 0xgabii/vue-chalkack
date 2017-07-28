<template>
  <section>
    <button @click="uploaderOpen = true">Upload</button>
    {{ album }}

    <uploader 
      v-show="uploaderOpen" 
      :album="album.key" 
      :user="me.id"
      @close="uploaderOpen = false"
    />

    <div class="dd" v-for="item in photos">
      <img :src="item.src" />
    </div>

  </section>
</template>

<script>
import { mapState } from 'vuex';

import albums from '~helpers/api/albums';
import photos from '~helpers/api/photos';

import Uploader from '../../Common/Uploader';

export default {
  name: 'AlbumPage',
  data: () => ({
    album: {},
    photos: [],

    uploaderOpen: false,
  }),
  computed: {
    ...mapState('auth', [
      'me',
    ]),
  },
  watch: {
    me() {
      this.listener();
    },
  },
  methods: {
    listener() {
      if (this.me && this.me.id) {
        albums.getList().orderByChild('owner').equalTo(this.me.id).on('value', (snapshot) => {
          this.getAlbum(snapshot.val());
        });
        photos.getList().orderByChild('owner').equalTo(this.me.id).on('value', (snapshot) => {
          this.getPhotos(snapshot.val());
        });
      }
    },
    getAlbum(list) {
      const { albumName } = this.$route.params;

      Object.keys(list).forEach((key) => {
        const item = list[key];

        if (item.name === albumName) {
          this.album = { key, ...item };
        }
      });
    },
    getPhotos(list) {
      // reset state
      this.photos = [];
      // find photos by album key
      Object.keys(list).forEach((key) => {
        const item = list[key];

        if (item.album === this.album.key) {
          this.photos.push(item);
        }
      });
    },
  },
  created() {
    this.listener();
  },
  components: {
    Uploader,
  },
};
</script>
