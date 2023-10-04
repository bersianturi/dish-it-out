import 'regenerator-runtime';
import CacheHelper from './utils/cache-helper';

const assetsToCache = [
  './',
  './images/icons/icon-72.png',
  './images/icons/icon-96.png',
  './images/icons/icon-128.png',
  './images/icons/icon-144.png',
  './images/icons/icon-152.png',
  './images/icons/icon-192.png',
  './images/icons/icon-384.png',
  './images/icons/icon-512.png',
  './images/heros/hero-image_2.jpg',
  './index.html',
  './images/favicon.ico',
  './app.bundle.js',
  './app.webmanifest',
  './sw.bundle.js',
];

self.addEventListener('install', (event) => {
  console.log('Installing Service Worker ...');
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener('activate', (event) => {
  console.log('Activating Service Worker ...');
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
