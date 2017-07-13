<template>
  <div class="mainPage">

    <first-time-user-modal />
  </div>
</template>

<script>
import FirstTimeUser from '../Modals/FirstTimeUser';

export default {
  name: 'MainPage',
  components: {
    FirstTimeUserModal: FirstTimeUser,
  },
};
</script>
