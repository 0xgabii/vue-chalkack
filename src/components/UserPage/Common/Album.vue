<template>
  <section class="album">

    <figure class="album__cover">
      <img src="https://images.unsplash.com/photo-1465311530779-5241f5a29892?dpr=1&auto=format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=" />
    </figure>

    <figcaption class="album-introduce">
      <div>
        <h3 class="album-introduce__name">
          {{data.name}}
        </h3>

        <div>
          <span class="album-introduce__tag" v-for="item in data.tags"># {{item}}</span>
        </div>
      </div>

      <i class="album-introduce__favorite" :class="favorite" />
    </figcaption>
  
  </section>
</template>

<script>
export default {
  name: 'Album',
  props: {
    data: {
      name: String,
      tags: Array,
      date: Number,
      is_favorite: Boolean,
    },
  },
  computed: {
    favorite() {
      return this.data.is_favorite ? 'ion-android-star' : 'ion-android-star-outline';
    },
  },
};
</script>
