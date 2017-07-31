<template>
  <section>
    <button @click="uploaderOpen = true">Upload</button>

    <uploader 
      v-show="uploaderOpen" 
      :album="album.key" 
      :user="me.id"
      @close="uploaderOpen = false"
    />

    <div 
      class="photos" 
      v-for="item in photos" 
      :key="item">
      <photo 
        v-for="(photo, index) in item"
        :key="photo"
        :data="photo"
        :height="250"
      />
    </div>

  </section>
</template>

<script>
import { mapState } from 'vuex';

import albums from '~helpers/api/albums';
import photos from '~helpers/api/photos';

import Uploader from '../../Common/Uploader';
import Photo from '../../Common/Photo';

const photosIntoColumn = (photoList) => {
  const one = [];
  const two = [];
  const three = [];

  const returnTotalRatio = (arr) => {
    if (arr.length) return arr.map(item => item.ratio).reduce((p, c) => p + c);
    return 0;
  };

  photoList.reverse().forEach((photo, index) => {
    const oneRatio = returnTotalRatio(one);
    const twoRatio = returnTotalRatio(two);
    const threeRatio = returnTotalRatio(three);

    if ((oneRatio <= twoRatio && oneRatio <= threeRatio) ||
      (oneRatio === twoRatio && oneRatio === threeRatio)) {
      console.log('one', index);
      one.push(photo);
    } else if (oneRatio > twoRatio && twoRatio <= threeRatio) {
      console.log('two', index);
      two.push(photo);
    } else {
      console.log('three', index);
      three.push(photo);
    }
  });

  return [
    one,
    two,
    three,
  ];
};

export default {
  name: 'AlbumPage',
  data: () => ({
    album: {},
    photos: [],

    uploaderOpen: false,
  }),
  computed: {
    ...mapState('auth', [
      'me',
    ]),
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
          this.getAlbum(snapshot.val());
        });
        photos.getList().orderByChild('owner').equalTo(this.me.id).on('value', (snapshot) => {
          this.getPhotos(snapshot.val());
        });
      }
    },
    getAlbum(list) {
      const { albumName } = this.$route.params;

      Object.keys(list).forEach((key) => {
        const item = list[key];

        if (item.name === albumName) {
          this.album = { key, ...item };
        }
      });
    },
    getPhotos(list) {
      const arr = [];
      // find photos by album key
      Object.keys(list).forEach((key) => {
        const item = list[key];

        if (item.album === this.album.key) {
          arr.push(item);
        }
      });
      // reset state
      this.photos = [];
      // mix photos & bind to data
      this.photos = photosIntoColumn(arr);
    },
  },
  created() {
    this.listener();
  },
  components: {
    Uploader,
    Photo,
  },
};
</script>
