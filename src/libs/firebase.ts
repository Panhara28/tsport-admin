import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC2TkI2MpNuP0mMPjEHJp1EQWloHpfXgqE',
  authDomain: 'dummy-d1355.firebaseapp.com',
  databaseURL: 'https://dummy-d1355.firebaseio.com',
  projectId: 'dummy-d1355',
  storageBucket: 'dummy-d1355.appspot.com',
  messagingSenderId: '674933834216',
  appId: '1:674933834216:web:9b81c30848ac56636ce45d',
  measurementId: 'G-K97D8W24CQ',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export function UploadFileToFirebase(file: File) {
  const upload = uploadBytesResumable(ref(storage, 'tsport/' + file.name), file);

  return upload;
}
