import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true, // Indica que es un standalone component
  imports: [CommonModule], // Agrega CommonModule para usar 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuOpen = false;

  constructor(public authService: AuthService) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
