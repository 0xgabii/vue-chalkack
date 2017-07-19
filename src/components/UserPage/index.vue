<template>
  <section class="userPage">
    UserPage
    {{me}}

    <button @click="signOut">logout</button>

    <router-view></router-view>
  
    <!-- modal area -->
    <first-time-user-modal v-if="!me.displayName" />
    <create-album-modal v-if="modals.createAlbum" />

  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import FirstTimeUser from './Modals/FirstTimeUser';
import CreateAlbum from './Modals/CreateAlbum';

export default {
  name: 'UserPage',
  computed: {
    ...mapState('auth', [
      'me',
    ]),
    ...mapState('modals', [
      'modals',
    ]),
  },
  methods: {
    ...mapActions('auth', [
      'signOut',
    ]),
  },
  components: {
    FirstTimeUserModal: FirstTimeUser,
    CreateAlbumModal: CreateAlbum,
  },
};
</script>
