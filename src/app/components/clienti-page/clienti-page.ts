import { Component, OnInit, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ClientiService } from '../../clienti';
import { Cliente } from '../../models/clienti.model';

@Component({
  selector: 'app-clienti-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './clienti-page.html',
  styleUrls: ['./clienti-page.css']
})
export class ClientiPage implements OnInit {
  private clientiService = inject(ClientiService);
  private fb = inject(FormBuilder);

  clienti = signal<Cliente[]>([]);
  editingId = signal<string | null>(null);

  clienteForm = this.fb.group({
    nome: ['', Validators.required],
    cognome: ['', Validators.required],
    telefono: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    note: ['']
  });

  ngOnInit(): void {
    this.clientiService.getAll().subscribe({
      next: (dati) => this.clienti.set(dati),
      error: (err) => console.error('Errore nel recupero dei clienti:', err)
    });
  }

  onSubmit(): void {
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }

    const valori = this.clienteForm.value;
    const dati: Cliente = {
      nome: valori.nome!,
      cognome: valori.cognome!,
      telefono: valori.telefono!,
      email: valori.email!,
      note: valori.note ?? ''
    };

    const idInModifica = this.editingId();

    if (idInModifica) {
      this.clientiService.update(idInModifica, dati)
        .then(() => this.annullaModifica())
        .catch(err => console.error('Errore nell\'aggiornamento cliente:', err));
    } else {
      this.clientiService.add(dati)
        .then(() => this.clienteForm.reset())
        .catch(err => console.error('Errore nel salvataggio cliente:', err));
    }
  }

  modificaCliente(c: Cliente): void {
    this.editingId.set(c.id!);
    this.clienteForm.setValue({
      nome: c.nome,
      cognome: c.cognome,
      telefono: c.telefono,
      email: c.email,
      note: c.note
    });
  }

  annullaModifica(): void {
    this.editingId.set(null);
    this.clienteForm.reset();
  }

  eliminaCliente(id: string): void {
    if (!confirm('Vuoi davvero eliminare questo cliente?')) return;
    this.clientiService.delete(id)
      .catch(err => console.error('Errore nell\'eliminazione cliente:', err));
  }
}
