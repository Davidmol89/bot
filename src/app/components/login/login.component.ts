import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Inicialización del componente
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }

  goBack() {
    this.router.navigate(['/']);
  }
}

