import firebase from 'firebase/app';
import 'firebase/auth';
// import { useRouter } from 'next/router';
// import { clientCredentials } from './client';

const checkUser = (uid) => new Promise((resolve, reject) => {
  fetch(`http://localhost:5212/api/checkuser/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(async (res) => {
      let data;
      console.log('status:', res);
      if (res.status === 204) {
        resolve({});
      } else {
        data = await res.json();
        console.log('data:', data);
        resolve(data);
      }
      // const status = res.status.toString()[0];
      // if (status === '4') {
      //   throw new Error('not found');
      // } else if (status === '5') {
      //   throw new Error('could not reach server, try again later');
      // }
    })
    .catch(reject);
});

const registerUser = (userInfo) => new Promise((resolve, reject) => {
  fetch('http://localhost:5212/api/users/', {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

export {
  signIn, //
  signOut,
  checkUser,
  registerUser,
};
