import React from 'react';
import ReactDOMClient from 'react-dom/client';

import { App } from './components/App';
import './reset.scss';
import './normalize.scss';

const root = ReactDOMClient.createRoot(document.getElementById('root')!);

root.render(<App />);

if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register('service-worker.js')
    .then((res) => res)
    .catch((err) => err);
}
