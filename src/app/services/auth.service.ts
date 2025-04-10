import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(
    private auth: Auth,
    private router: Router
  ) {
    console.log('AuthService inicializado');
    
    // Verificar si hay un usuario en localStorage al iniciar
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log('Usuario encontrado en localStorage');
      this.userSubject.next(JSON.parse(storedUser));
    }

    // Suscribirse a cambios en el estado de autenticación
    this.auth.onAuthStateChanged(user => {
      console.log('Estado de autenticación cambiado:', user ? 'Usuario autenticado' : 'Usuario no autenticado');
      this.userSubject.next(user);
      
      if (user) {
        console.log('Guardando usuario en localStorage');
        localStorage.setItem('user', JSON.stringify(user));
        // Si estamos en la página de inicio o login, redirigir a home
        if (this.router.url === '/' || this.router.url === '/login') {
          console.log('Redirigiendo a /home');
          this.router.navigate(['/home']);
        }
      } else {
        console.log('Eliminando usuario de localStorage');
        localStorage.removeItem('user');
        // Si estamos en una ruta protegida, redirigir al inicio
        if (this.router.url === '/home') {
          console.log('Redirigiendo a /');
          this.router.navigate(['/']);
        }
      }
    });
  }

  get user() {
    return this.userSubject.value;
  }

  async signInWithGoogle() {
    try {
      console.log('Iniciando proceso de autenticación con Google');
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const result = await signInWithPopup(this.auth, provider);
      console.log('Inicio de sesión exitoso:', result.user.email);
      this.router.navigate(['/home']);
    } catch (error: any) {
      console.error('Error en el inicio de sesión:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('El usuario cerró la ventana de autenticación');
      } else if (error.code === 'auth/cancelled-popup-request') {
        console.log('Solicitud de autenticación cancelada');
      } else {
        console.error('Error de autenticación:', error.message);
      }
    }
  }

  async logout() {
    try {
      console.log('Iniciando proceso de cierre de sesión');
      await signOut(this.auth);
      console.log('Cierre de sesión exitoso');
      this.router.navigate(['/']);
    } catch (error: any) {
      console.error('Error en el cierre de sesión:', error.message);
    }
  }
}
