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
      <div class="tagsInput">
        <div class="tagsInput-list">
          <span v-for="(item, index) in tags.list" @click="removeTag(index)">
            {{item}}
          </span>
        </div>
        <input
          class="tagsInput__typeTag" 
          v-model="tags.input" 
          @keydown.enter="addTag" 
          @keydown.tab.prevent="addTag" />
      </div>
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
    tags: {
      input: '',
      list: [],
      max: 4,
    },
  }),
  computed: {
    ...mapState('auth', [
      'me',
    ]),
  },
  methods: {
    addTag() {
      const { input, list, max } = this.tags;
      if (list.length < max) {
        this.tags.list.push(input);
        this.tags.input = '';
      }
    },
    removeTag(index) {
      this.tags.list.splice(index, 1);
    },
    createAlbum() {
      const { name, tags, me } = this;

      albums.create({
        name,
        tags: tags.list,
        user: me.id,
      });
    },
  },
};
</script>
