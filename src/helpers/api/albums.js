import firebase from '../firebase';

const database = firebase.database();

export default {
  get(id) {
    return database.ref(`albums/${id}`);
  },
  getList() {
    return database.ref('albums');
  },
  /*
    @{name: String}
    @{tags: Array}
    @{user: Number}: user id
  */
  create({
    name,
    tags,
    user: owner,
  }) {
    database.ref('albums').push({
      name,
      tags,
      owner,
      photos: [],
      is_favorite: false,
      is_deleted: false,
      date: new Date().getTime(),
    });
  },
  /*
    @{id: Number}
    @{album: Object}
  */
  update({
    id,
    album,
  }) {
    database.ref(`albums/${id}`).update(album);
  },
  remove(id) {
    database.ref(`albums/${id}`).remove();
  },
};
