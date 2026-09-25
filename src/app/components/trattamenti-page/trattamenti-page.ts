import { Component, OnInit, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TrattamentiService } from '../../trattamenti';
import { Trattamento } from '../../models/trattamento.model';

@Component({
  selector: 'app-trattamenti-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './trattamenti-page.html',
  styleUrls: ['./trattamenti-page.css']
})
export class TrattamentiPage implements OnInit {
  private trattamentiService = inject(TrattamentiService);
  private fb = inject(FormBuilder);

  trattamenti = signal<Trattamento[]>([]);
  editingId = signal<string | null>(null);

  trattamentoForm = this.fb.group({
    nome: ['', Validators.required],
    descrizione: ['', Validators.required],
    durataMinuti: [null as number | null, [Validators.required, Validators.min(1)]],
    prezzo: [null as number | null, [Validators.required, Validators.min(0)]]
  });

  ngOnInit(): void {
    this.trattamentiService.getAll().subscribe({
      next: (dati) => this.trattamenti.set(dati),
      error: (err) => console.error('Errore nel recupero dei trattamenti:', err)
    });
  }

  onSubmit(): void {
    if (this.trattamentoForm.invalid) {
      this.trattamentoForm.markAllAsTouched();
      return;
    }

    const valori = this.trattamentoForm.value;
    const dati: Trattamento = {
      nome: valori.nome!,
      descrizione: valori.descrizione!,
      durataMinuti: valori.durataMinuti!,
      prezzo: valori.prezzo!
    };

    const idInModifica = this.editingId();

    if (idInModifica) {
      this.trattamentiService.update(idInModifica, dati)
        .then(() => this.annullaModifica())
        .catch(err => console.error('Errore nell\'aggiornamento:', err));
    } else {
      this.trattamentiService.add(dati)
        .then(() => this.trattamentoForm.reset())
        .catch(err => console.error('Errore nel salvataggio:', err));
    }
  }

  modificaTrattamento(t: Trattamento): void {
    this.editingId.set(t.id!);
    this.trattamentoForm.setValue({
      nome: t.nome,
      descrizione: t.descrizione,
      durataMinuti: t.durataMinuti,
      prezzo: t.prezzo
    });
  }

  annullaModifica(): void {
    this.editingId.set(null);
    this.trattamentoForm.reset();
  }

  eliminaTrattamento(id: string): void {
    if (!confirm('Vuoi davvero eliminare questo trattamento?')) return;
    this.trattamentiService.delete(id)
      .catch(err => console.error('Errore nell\'eliminazione:', err));
  }
}
