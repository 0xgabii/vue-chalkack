<template>
  <section class="albumPage">

    <aside class="sidebar">

       <button @click="uploaderOpen = true">Upload</button>

    </aside>

    <scroll v-if="photos.length" class="content" :vertical="false">
      <div
        class="photos" 
        v-for="item in photos" 
        :key="item">
        <photo 
          v-for="(photo, index) in item"
          :key="photo"
          :data="photo"
          :height="photoHeight"
        />
      </div>
    </scroll>

    <uploader 
      v-show="uploaderOpen" 
      :album="album.key" 
      :user="me.id"
      @close="uploaderOpen = false"
    />

  </section>
</template>

<script>
import { mapState } from 'vuex';

import albums from '~helpers/api/albums';
import photos from '~helpers/api/photos';

import Uploader from '../../Common/Uploader';
import Photo from '../../Common/Photo';
import Scroll from '../../Common/Scroll';

const photosIntoColumn = (photoList) => {
  const one = [];
  const two = [];
  const three = [];

  const returnTotalRatio = (arr) => {
    if (arr.length) return arr.map(item => item.ratio).reduce((p, c) => p + c);
    return 0;
  };

  photoList.reverse().forEach((photo) => {
    const oneRatio = returnTotalRatio(one);
    const twoRatio = returnTotalRatio(two);
    const threeRatio = returnTotalRatio(three);

    if ((oneRatio <= twoRatio && oneRatio <= threeRatio) ||
      (oneRatio === twoRatio && oneRatio === threeRatio)) {
      one.push(photo);
    } else if (oneRatio > twoRatio && twoRatio <= threeRatio) {
      two.push(photo);
    } else {
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

    photoHeight: 200,

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
  mounted() {
    const { height } = document.querySelector('.albumPage').getBoundingClientRect();
    this.photoHeight = (height - 160) / 3;
  },
  components: {
    Uploader,
    Photo,
    Scroll,
  },
};
</script>
