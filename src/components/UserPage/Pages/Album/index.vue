<template>
  <section>
    <button @click="openUploadPhoto">Upload</button>
    {{ album }}

    <div class="dd" v-for="item in photos">
      <img :src="item.src" />
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import albums from '~helpers/api/albums';
import photos from '~helpers/api/photos';

export default {
  name: 'AlbumPage',
  data: () => ({
    album: {},
    photos: [],
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
    ...mapActions('modals', [
      'openModal',
    ]),
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
      Object.keys(list).forEach((key) => {
        const item = list[key];

        this.photos.push(item);
      });
    },
    openUploadPhoto() {
      this.openModal({
        name: 'uploadPhoto',
        data: {
          album: this.album.key,
          user: this.me.id,
        },
      });
    },
  },
  created() {
    this.listener();
  },
};
</script>
