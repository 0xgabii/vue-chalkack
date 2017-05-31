<template>
  <form @submit.prevent="SignUp">
    <input v-model="form.email" />
    <input v-model="form.pwd" />

    <button>Submit</button>
  </form>
</template>

<script>
// import firebase from '~helpers/firebase';

export default {
  name: 'RegisterPage',
  data: () => ({
    form: {
      email: '',
      pwd: '',
    },
  }),
  methods: {
    SignUp() {
      // const { email, pwd } = this.form;
    },
  },
};
</script>
