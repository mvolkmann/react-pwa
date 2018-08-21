import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

let deferredPrompt;
const addBtn = document.querySelector('#addToHomeScreen');

window.addEventListener('beforeinstallprompt', e => {
  console.log('index.js: got beforeinstallprompt event');
  // Prevent Chrome 67 and earlier from automatically showing the prompt.
  e.preventDefault();
  deferredPrompt = e;
  addBtn.style.display = 'block';
});

addBtn.addEventListener('click', e => {
  addBtn.style.display = 'none';
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(choiceResult => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    deferredPrompt = null;
  });
});

window.addEventListener('appinstalled', evt => {
  console.log('The app was installed!');
});

if (window.matchMedia('(display-mode: standalone)').matches) {
  console.log('display-mode is standalone');
}

function checkForUpdate() {
  fetch('version.txt')
    .then(res => res.text())
    .then(version => {
      const currentVersion = sessionStorage.getItem('app-version');
      if (version !== currentVersion) {
        console.info('version changed from', currentVersion, 'to', version);
        const download = window.confirm(
          'A new version of this app is available.  ' +
            'It will take a few seconds to download.  ' +
            'Download now?'
        );
        if (download) {
          window.location.reload();
          sessionStorage.setItem('app-version', version);
        }
      }
    })
    // Will get an error if the server is down.
    .catch(() => {}); // Ignore these errors.
}

setInterval(checkForUpdate, 5000);
