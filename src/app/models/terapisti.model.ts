export interface Turno {
  giorno: 'Lunedì' | 'Martedì' | 'Mercoledì' | 'Giovedì' | 'Venerdì' | 'Sabato' | 'Domenica';
  oraInizio: string; // formato "HH:mm", es. "09:00"
  oraFine: string;
}

export interface Terapista {
  id?: string;
  nome: string;
  cognome: string;
  specializzazione: string;
  turni: Turno[];
}