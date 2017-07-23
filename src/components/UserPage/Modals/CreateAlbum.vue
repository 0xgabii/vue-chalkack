<template>
  <modal
    title="Create Your Album"
    @close="closeModal('createAlbum')">

    <text-input label="Name" v-model="name" />

    <tags-input label="Tags" v-model="tags" />

    <template slot="footer">
      <button class="cancel" @click="closeModal('createAlbum')">Cancel</button>
      <button class="submit" @click="createAlbum">Create</button>
    </template>

  </modal>  
</template>

<script>
import { mapActions } from 'vuex';
import albums from '~helpers/api/albums';

export default {
  name: 'CreateAlbumModal',
  props: {
    data: {
      type: Object,
    },
  },
  data: () => ({
    name: '',
    tags: [],
  }),
  watch: {
    // generate tags from name
    name(newName) {
      this.tags = newName.split(' ');
    },
  },
  methods: {
    ...mapActions('modals', [
      'closeModal',
    ]),
    createAlbum() {
      const { name, tags, data } = this;

      albums.create({
        name,
        tags,
        user: data.user,
      });
    },
  },
};
</script>
