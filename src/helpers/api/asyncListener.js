import firebase from '../firebase';

import albums from './albums';
import photos from './photos';

const updateAlbumWhenPhotoCreate = (user) => {
  photos.getList().orderByChild('owner').equalTo(user.uid).on('value', (snapshot) => {
    const list = snapshot.val();
    const { album, src } = Object.keys(list).map(key => list[key]).pop();

    albums.update({
      id: album,
      album: {
        cover: src,
        num_photos: Object.keys(list).filter(key => list[key].album === album).length,
      },
    });
  });
};

const installAsyncListener = () => firebase.auth().onAuthStateChanged((user) => {
  if (!user) return;

  updateAlbumWhenPhotoCreate(user);
});

export default installAsyncListener;
