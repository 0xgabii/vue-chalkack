<template>
  <modal
    title="Create Your Album"
    @close="handleClose">

    <text-input label="Name" v-model="name" />

    <tags-input label="Tags" v-model="tags" />

    <template slot="footer">
      <button class="cancel" @click="handleClose">Cancel</button>
      <button class="submit" @click="createAlbum">Create</button>
    </template>

  </modal>  
</template>

<script>
import albums from '~helpers/api/albums';

export default {
  name: 'CreateAlbumModal',
  props: {
    user: String,
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
    handleClose() {
      this.$router.replace({ name: 'UserPage' });
    },
    createAlbum() {
      const { name, tags, user } = this;

      albums.create({
        name,
        tags,
        user,
      });
    },
  },
};
</script>
