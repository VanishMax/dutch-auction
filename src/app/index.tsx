import { createRoot } from 'react-dom/client';

import '@fontsource-variable/noto-sans-devanagari';

import { App } from './app.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <App />
);
