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
import { Cliente } from './models/clienti.model';

@Injectable({
  providedIn: 'root'
})
export class ClientiService {
  private collectionRef;

  constructor(private firestore: Firestore) {
    this.collectionRef = collection(this.firestore, 'clienti');
  }

  getAll(): Observable<Cliente[]> {
    return collectionData(this.collectionRef, { idField: 'id' }) as Observable<Cliente[]>;
  }

  add(cliente: Cliente) {
    return addDoc(this.collectionRef, cliente);
  }

  update(id: string, cliente: Partial<Cliente>) {
    const docRef = doc(this.firestore, 'clienti', id);
    return updateDoc(docRef, cliente);
  }

  delete(id: string) {
    const docRef = doc(this.firestore, 'clienti', id);
    return deleteDoc(docRef);
  }
}