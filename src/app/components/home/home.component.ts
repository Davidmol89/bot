import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule, SafeUrlPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  iframeHeight: number = 600;

  constructor() { }

  ngOnInit() {
    this.calculateIframeHeight();
    window.addEventListener('resize', () => this.calculateIframeHeight());
  }

  calculateIframeHeight() {
    // Ajusta la altura del iframe según el tamaño de la ventana
    const windowHeight = window.innerHeight;
    const navbarHeight = 64; // Altura aproximada de la navbar
    this.iframeHeight = windowHeight - navbarHeight;
  }
}
