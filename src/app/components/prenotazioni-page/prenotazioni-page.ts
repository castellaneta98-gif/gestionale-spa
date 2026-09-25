import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PrenotazioniService } from '../../prenotazioni';
import { Prenotazione } from '../../models/prenotazione.model';
import { ClientiService } from '../../clienti';
import { Cliente } from '../../models/clienti.model';
import { TerapistiService } from '../../terapisti';
import { Terapista } from '../../models/terapisti.model';
import { TrattamentiService } from '../../trattamenti';
import { Trattamento } from '../../models/trattamento.model';

@Component({
  selector: 'app-prenotazioni-page',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './prenotazioni-page.html',
  styleUrls: ['./prenotazioni-page.css']
})
export class PrenotazioniPage implements OnInit {
  private prenotazioniService = inject(PrenotazioniService);
  private clientiService = inject(ClientiService);
  private terapistiService = inject(TerapistiService);
  private trattamentiService = inject(TrattamentiService);
  private fb = inject(FormBuilder);

  prenotazioni = signal<Prenotazione[]>([]);
  clienti = signal<Cliente[]>([]);
  terapisti = signal<Terapista[]>([]);
  trattamenti = signal<Trattamento[]>([]);
  editingId = signal<string | null>(null);

  // Il computed si ricalcola automaticamente ogni volta che uno dei signal letti al suo interno cambia
  prenotazioniConDettagli = computed(() => {
    return this.prenotazioni().map(p => ({
      ...p,
      clienteNome: this.trovaCliente(p.clienteId),
      terapistaNome: this.trovaTerapista(p.terapistaId),
      trattamentoNome: this.trovaTrattamento(p.trattamentoId)
    }));
  });

  prenotazioneForm = this.fb.group({
    clienteId: ['', Validators.required],
    terapistaId: ['', Validators.required],
    trattamentoId: ['', Validators.required],
    data: ['', Validators.required],
    ora: ['', Validators.required]
  });

  ngOnInit(): void {
    this.prenotazioniService.getAll().subscribe({
      next: (dati) => this.prenotazioni.set(dati),
      error: (err) => console.error('Errore nel recupero delle prenotazioni:', err)
    });

    this.clientiService.getAll().subscribe({
      next: (dati) => this.clienti.set(dati),
      error: (err) => console.error('Errore nel recupero dei clienti:', err)
    });

    this.terapistiService.getAll().subscribe({
      next: (dati) => this.terapisti.set(dati),
      error: (err) => console.error('Errore nel recupero dei terapisti:', err)
    });

    this.trattamentiService.getAll().subscribe({
      next: (dati) => this.trattamenti.set(dati),
      error: (err) => console.error('Errore nel recupero dei trattamenti:', err)
    });
  }

  private trovaCliente(id: string): string {
    const c = this.clienti().find(c => c.id === id);
    return c ? `${c.nome} ${c.cognome}` : 'Cliente non trovato';
  }

  private trovaTerapista(id: string): string {
    const t = this.terapisti().find(t => t.id === id);
    return t ? `${t.nome} ${t.cognome}` : 'Terapista non trovato';
  }

  private trovaTrattamento(id: string): string {
    const t = this.trattamenti().find(t => t.id === id);
    return t ? t.nome : 'Trattamento non trovato';
  }

  onSubmit(): void {
    if (this.prenotazioneForm.invalid) {
      this.prenotazioneForm.markAllAsTouched();
      return;
    }

    const valori = this.prenotazioneForm.value;
    const dati: Prenotazione = {
      clienteId: valori.clienteId!,
      terapistaId: valori.terapistaId!,
      trattamentoId: valori.trattamentoId!,
      data: valori.data!,
      ora: valori.ora!
    };

    const idInModifica = this.editingId();

    if (idInModifica) {
      this.prenotazioniService.update(idInModifica, dati)
        .then(() => this.annullaModifica())
        .catch(err => console.error('Errore nell\'aggiornamento:', err));
    } else {
      this.prenotazioniService.add(dati)
        .then(() => this.prenotazioneForm.reset())
        .catch(err => console.error('Errore nel salvataggio:', err));
    }
  }

  modificaPrenotazione(p: Prenotazione): void {
    this.editingId.set(p.id!);
    this.prenotazioneForm.setValue({
      clienteId: p.clienteId,
      terapistaId: p.terapistaId,
      trattamentoId: p.trattamentoId,
      data: p.data,
      ora: p.ora
    });
  }

  annullaModifica(): void {
    this.editingId.set(null);
    this.prenotazioneForm.reset();
  }

  eliminaPrenotazione(id: string): void {
    if (!confirm('Vuoi davvero eliminare questa prenotazione?')) return;
    this.prenotazioniService.delete(id)
      .catch(err => console.error('Errore nell\'eliminazione:', err));
  }
}
