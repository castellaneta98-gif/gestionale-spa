import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  private authService = inject(AuthService);
  private router = inject(Router);

  utente = this.authService.currentUser;
  menuAperto = signal(false);

  toggleMenu(): void {
    this.menuAperto.update(v => !v);
  }

  chiudiMenu(): void {
    this.menuAperto.set(false);
  }

   logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['/']);
    });
    this.chiudiMenu();
  }
}