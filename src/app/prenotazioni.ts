import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Prenotazione } from './models/prenotazione.model';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioniService {
  private collectionRef;

  constructor(private firestore: Firestore) {
    this.collectionRef = collection(this.firestore, 'prenotazioni');
  }

  getAll(): Observable<Prenotazione[]> {
    return collectionData(this.collectionRef, { idField: 'id' }) as Observable<Prenotazione[]>;
  }

  add(prenotazione: Prenotazione) {
    return addDoc(this.collectionRef, prenotazione);
  }

  update(id: string, prenotazione: Partial<Prenotazione>) {
    const docRef = doc(this.firestore, 'prenotazioni', id);
    return updateDoc(docRef, prenotazione);
  }

  delete(id: string) {
    const docRef = doc(this.firestore, 'prenotazioni', id);
    return deleteDoc(docRef);
  }
}