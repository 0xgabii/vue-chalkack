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
import { mapState } from 'vuex';
import albums from '~helpers/api/albums';

export default {
  name: 'CreateAlbumModal',
  data: () => ({
    name: '',
    tags: '',
  }),
  computed: {
    ...mapState('auth', [
      'me',
    ]),
  },
  methods: {
    createAlbum() {
      const { name, tags, me } = this;

      albums.create({
        name,
        tags: tags.split(','),
        user: me.id,
      });
    },
  },
};
</script>
