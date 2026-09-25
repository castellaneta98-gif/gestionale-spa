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
import { Trattamento } from './models/trattamento.model';

@Injectable({
  providedIn: 'root'
})
export class TrattamentiService {
  private collectionRef;

  constructor(private firestore: Firestore) {
    this.collectionRef = collection(this.firestore, 'trattamenti');
  }

  getAll(): Observable<Trattamento[]> {
    return collectionData(this.collectionRef, { idField: 'id' }) as Observable<Trattamento[]>;
  }

  add(trattamento: Trattamento) {
    return addDoc(this.collectionRef, trattamento);
  }

  update(id: string, trattamento: Partial<Trattamento>) {
    const docRef = doc(this.firestore, 'trattamenti', id);
    return updateDoc(docRef, trattamento);
  }

  delete(id: string) {
    const docRef = doc(this.firestore, 'trattamenti', id);
    return deleteDoc(docRef);
  }
}