<template>
  <div class="mainPage">

    <button @click="openCreateAlbum">Create Album</button>

    <router-link v-for="item in albums" :to="{ name: 'AlbumPage', params: { albumName: item.name } }">
      <album 
        v-if="!item.is_deleted" 
        :data="item"
      />
    </router-link>
    
    <router-view v-bind="modalProps"></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';

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
    modalProps() {
      const { name } = this.$route;

      if (name === 'CreateAlbum') {
        return {
          user: this.me.id,
        };
      }

      return {};
    },
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
          this.getAlbums(snapshot.val());
        });
      }
    },
    getAlbums(list) {
      this.albums = list;
    },
    openCreateAlbum() {
      this.$router.push({ name: 'CreateAlbum' });
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
