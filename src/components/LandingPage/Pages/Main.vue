<template>
  <div class="mainPage">

    랜딩페이지

    <button @click="$router.push({ name: 'AuthPage' })">Get Started!</button>    
  </div>
</template>

<script>
export default {
  name: 'MainPage',
};
</script>
