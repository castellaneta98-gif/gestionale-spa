export interface Cliente {
  id?: string;
  nome: string;
  cognome: string;
  telefono: string;
  email: string;
  note: string; // scheda personalizzata: preferenze, allergie, trattamenti seguiti
}