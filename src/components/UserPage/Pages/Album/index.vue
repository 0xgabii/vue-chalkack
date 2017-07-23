<template>
  <section>
    <button @click="openUploadPhoto">Upload</button>
    {{ album }}
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import albums from '~helpers/api/albums';

export default {
  name: 'AlbumPage',
  data: () => ({
    album: {},
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
      }
    },
    getAlbum(list) {
      const { albumName } = this.$route.params;

      Object.keys(list).forEach((key) => {
        if (list[key].name === albumName) {
          this.album = { key, ...list[key] };
        }
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
