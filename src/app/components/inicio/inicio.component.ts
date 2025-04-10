import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  isMenuOpen = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Verificar si ya está autenticado
    this.authService.user$.subscribe(user => {
      if (user) {
        console.log('Usuario ya autenticado, redirigiendo a home');
        this.router.navigate(['/home']);
      }
    });
  }

  goToLogin() {
    console.log('Redirigiendo a login');
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
