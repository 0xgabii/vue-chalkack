import firebase from '../firebase';

const database = firebase.database();

export default {
  /*
    @{name: String}
    @{tags: Array}
    @{uid: Number}: user id
  */
  create({
    name,
    tags,
    uid: owner,
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
