import React from 'react';
import ReactDOMClient from 'react-dom/client';

import { App } from './components/App';
import './reset.scss';

const root = ReactDOMClient.createRoot(document.getElementById('root')!);

root.render(<App />);

if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register('service-worker.js')
    .then((res) => console.log(res))
    .catch((err) => console.log('lol' + err));
} else {
  console.log('Бля');
}
