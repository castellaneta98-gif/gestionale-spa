import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "gestionale-spa", appId: "1:878282226247:web:d8d601552a1ade2392cf62", storageBucket: "gestionale-spa.firebasestorage.app", apiKey: "AIzaSyDK9uNcL4UIVRU9BupK4KuZNA-ibwvj7Pc", authDomain: "gestionale-spa.firebaseapp.com", messagingSenderId: "878282226247"})), provideFirestore(() => getFirestore()), provideAuth(() => getAuth())
  ]
};
