import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { TrattamentiPage } from './components/trattamenti-page/trattamenti-page';
import { ClientiPage } from './components/clienti-page/clienti-page';
import { TerapistiPage } from './components/terapisti-page/terapisti-page';
import { LoginPage } from './components/login-page/login-page';
import { PrenotazioniPage } from './components/prenotazioni-page/prenotazioni-page';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'trattamenti', component: TrattamentiPage },
  { path: 'clienti', component: ClientiPage },
  { path: 'prenotazioni', component: PrenotazioniPage },
  { path: 'terapisti', component: TerapistiPage },
  { path: 'login', component: LoginPage },
  { path: '**', redirectTo: '' }
];