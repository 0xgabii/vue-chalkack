<template>
  <modal 
    class="createAlbum"
    title="Create Your Album">

    <text-input label="Name" v-model="name" />

    <tags-input label="Tags" v-model="tags" />

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
    tags: [],
  }),
  computed: {
    ...mapState('auth', [
      'me',
    ]),
  },
  watch: {
    // generate tags from name
    name(newName) {
      this.tags = newName.split(' ');
    },
  },
  methods: {
    createAlbum() {
      const { name, tags, me } = this;

      albums.create({
        name,
        tags,
        user: me.id,
      });
    },
  },
};
</script>
