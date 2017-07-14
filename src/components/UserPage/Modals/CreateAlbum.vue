<template>
  <modal 
    class="createAlbum"
    title="Create Your Album">

    <div class="inputBox">
      <label class="inputBox__guideText">Name</label>
      <input
        class="inputBox__typeText" 
        v-model="name" />
    </div>

    <div class="inputBox">
      <label class="inputBox__guideText">Tags</label>
      <input
        class="inputBox__typeText" 
        v-model="tags" />
    </div>

    <template slot="footer">
      <button class="cancel">Cancel</button>
      <button class="submit" @click="createAlbum">Create</button>
    </template>

  </modal>  
</template>

<script>
// import { mapActions } from 'vuex';

export default {
  name: 'CreateAlbumModal',
  data: () => ({
    name: '',
    tags: '',
  }),
  methods: {
    createAlbum() {

    },
  },
};
</script>
