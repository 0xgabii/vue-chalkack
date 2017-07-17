import Vue from 'vue';

import TextInput from '~components/Common/Inputs/Text';
import TagsInput from '~components/Common/Inputs/Tags';

import Modal from '~components/Modals/Layout/Default';

const install = () => {
  Vue.component('text-input', TextInput);
  Vue.component('tags-input', TagsInput);

  Vue.component('modal', Modal);
};

export default install;
