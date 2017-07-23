import firebase from '../firebase';

const database = firebase.database();

export default {
  get(id) {
    return database.ref(`photos/${id}`);
  },
  getList() {
    return database.ref('photos');
  },
  /*
    @{name: String}
    @{album: String}: album id
    @{user: String}: user id
    @{src: String}: upload file url
    @{ratio: Number}: photo ratio (for lazy load)
    @{color: Array}: main, sub color from photo
  */
  create({
    name,
    album,
    user,
    src,
    ratio,
    color,
  }) {
    database.ref('photos').push({
      name,
      album,
      src,
      ratio,
      color,
      owner: user,
      is_deleted: false,
      date: new Date().getTime(),
    });
  },
  remove(id) {
    database.ref(`photos/${id}`).remove();
  },
};
