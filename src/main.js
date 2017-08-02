// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import VueFire from 'vuefire';

Vue.use(VueFire);

import App from './App';

import store from './store';

import router from './router';

// install global components
import install from '~helpers/globalComponents';

install();

// install asynclistener
import installAsyncListener from '~helpers/api/asyncListener';

installAsyncListener();

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
