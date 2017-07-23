<template>
  <section class="userPage">
    UserPage
    {{me}}

    <button @click="signOut">logout</button>

    <router-view></router-view>
  
    <!-- modal area -->
    <first-time-user-modal v-if="firstTime" />
    <create-album-modal 
      v-if="createAlbum || createAlbum.visible"
      :data="createAlbum.data"
    />
    <upload-photo-modal 
      v-if="uploadPhoto || uploadPhoto.visible"
      :data="uploadPhoto.data"
    />

  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import FirstTimeUser from './Modals/FirstTimeUser';
import CreateAlbum from './Modals/CreateAlbum';
import UploadPhoto from './Modals/UploadPhoto';

export default {
  name: 'UserPage',
  computed: {
    ...mapState('auth', [
      'me',
    ]),
    ...mapState('modals', [
      'createAlbum',
      'uploadPhoto',
    ]),
    firstTime() {
      if (Object.keys(this.me).length && !this.me.id) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions('auth', [
      'signOut',
    ]),
  },
  components: {
    FirstTimeUserModal: FirstTimeUser,
    CreateAlbumModal: CreateAlbum,
    UploadPhotoModal: UploadPhoto,
  },
};
</script>
