import firebase from '../firebase';

import albums from './albums';

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

    const getPhotoList = this.getList().orderByChild('owner').equalTo(user).once('value');
    getPhotoList.then((snapshot) => {
      const list = snapshot.val();

      // update album
      albums.update({
        id: album,
        album: {
          cover: Object.keys(list).map(key => list[key]).pop().src,
          // eslint-disable-next-line
          num_photos: Object.keys(list).filter(key => list[key].album === album && !list[key].is_deleted).length,
        },
      });
    });
  },
  update({
    id,
    photo,
  }) {
    database.ref(`photos/${id}`).update(photo);
  },
  remove(id) {
    database.ref(`photos/${id}`).remove();
  },
};
