import { Component, OnInit, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormArray, Validators } from '@angular/forms';
import { TerapistiService } from '../../terapisti';
import { Terapista, Turno } from '../../models/terapisti.model';

@Component({
  selector: 'app-terapisti-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './terapisti-page.html',
  styleUrls: ['./terapisti-page.css']
})
export class TerapistiPage implements OnInit {
  private terapistiService = inject(TerapistiService);
  private fb = inject(FormBuilder);

  terapisti = signal<Terapista[]>([]);
  editingId = signal<string | null>(null);

  giorniSettimana = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];

  terapistaForm = this.fb.group({
    nome: ['', Validators.required],
    cognome: ['', Validators.required],
    specializzazione: ['', Validators.required],
    turni: this.fb.array<ReturnType<typeof this.creaTurnoControl>>([])
  });

  ngOnInit(): void {
    this.terapistiService.getAll().subscribe({
      next: (dati) => this.terapisti.set(dati),
      error: (err) => console.error('Errore nel recupero dei terapisti:', err)
    });
  }

  get turniArray(): FormArray {
    return this.terapistaForm.get('turni') as FormArray;
  }

  private creaTurnoControl(turno?: Turno) {
    return this.fb.group({
      giorno: [turno?.giorno ?? 'Lunedì', Validators.required],
      oraInizio: [turno?.oraInizio ?? '09:00', Validators.required],
      oraFine: [turno?.oraFine ?? '18:00', Validators.required]
    });
  }

  aggiungiTurno(): void {
    this.turniArray.push(this.creaTurnoControl());
  }

  rimuoviTurno(index: number): void {
    this.turniArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.terapistaForm.invalid) {
      this.terapistaForm.markAllAsTouched();
      return;
    }

    const valori = this.terapistaForm.value;
    const dati: Terapista = {
      nome: valori.nome!,
      cognome: valori.cognome!,
      specializzazione: valori.specializzazione!,
      turni: (valori.turni ?? []) as Turno[]
    };

    const idInModifica = this.editingId();

    if (idInModifica) {
      this.terapistiService.update(idInModifica, dati)
        .then(() => this.annullaModifica())
        .catch(err => console.error('Errore nell\'aggiornamento:', err));
    } else {
      this.terapistiService.add(dati)
        .then(() => this.resetForm())
        .catch(err => console.error('Errore nel salvataggio:', err));
    }
  }

  modificaTerapista(t: Terapista): void {
    this.editingId.set(t.id!);
    this.terapistaForm.patchValue({
      nome: t.nome,
      cognome: t.cognome,
      specializzazione: t.specializzazione
    });

    this.turniArray.clear();
    t.turni.forEach(turno => this.turniArray.push(this.creaTurnoControl(turno)));
  }

  annullaModifica(): void {
    this.editingId.set(null);
    this.resetForm();
  }

  private resetForm(): void {
    this.terapistaForm.reset();
    this.turniArray.clear();
  }

  eliminaTerapista(id: string): void {
    if (!confirm('Vuoi davvero eliminare questo terapista?')) return;
    this.terapistiService.delete(id)
      .catch(err => console.error('Errore nell\'eliminazione:', err));
  }
}
