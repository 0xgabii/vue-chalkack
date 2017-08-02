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
      cover: 'https://firebasestorage.googleapis.com/v0/b/vue-chalkack.appspot.com/o/images%2Fphoto-1495611869653-166316536321.jpg?alt=media&token=5aa5bb16-f221-4c90-b89d-1e8ceb51a074',
      num_photos: 0,
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
