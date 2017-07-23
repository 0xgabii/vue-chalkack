<template>
  <div class="mainPage">

    <button @click="openCreateAlbum">Create Album</button>

    <router-link v-for="item in albums" :to="{ name: 'AlbumPage', params: { albumName: item.name } }">
      <album 
        v-if="!item.is_deleted" 
        :data="item"
      />
    </router-link>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import albums from '~helpers/api/albums';

import Album from '../Common/Album';

export default {
  name: 'MainPage',
  data: () => ({
    albums: [],
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
          this.getAlbums(snapshot.val());
        });
      }
    },
    getAlbums(list) {
      this.albums = list;
    },
    openCreateAlbum() {
      this.openModal({
        name: 'createAlbum',
        data: {
          user: this.me.id,
        },
      });
    },
  },
  created() {
    this.listener();
  },
  components: {
    Album,
  },
};
</script>
