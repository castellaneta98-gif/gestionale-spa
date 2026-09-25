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
import { Terapista } from './models/terapisti.model';

@Injectable({
  providedIn: 'root'
})
export class TerapistiService {
  private collectionRef;

  constructor(private firestore: Firestore) {
    this.collectionRef = collection(this.firestore, 'terapisti');
  }

  getAll(): Observable<Terapista[]> {
    return collectionData(this.collectionRef, { idField: 'id' }) as Observable<Terapista[]>;
  }

  add(terapista: Terapista) {
    return addDoc(this.collectionRef, terapista);
  }

  update(id: string, terapista: Partial<Terapista>) {
    const docRef = doc(this.firestore, 'terapisti', id);
    return updateDoc(docRef, terapista);
  }

  delete(id: string) {
    const docRef = doc(this.firestore, 'terapisti', id);
    return deleteDoc(docRef);
  }
}