export interface Prenotazione {
  id?: string;
  clienteId: string;
  terapistaId: string;
  trattamentoId: string;
  data: string; // formato "YYYY-MM-DD"
  ora: string;  // formato "HH:mm"
}