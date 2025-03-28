import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import 'reflect-metadata';

if (environment.production) {
  enableProdMode();
  selfXSSWarning(); // Mostramos advertencia si es producción.
}

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));

function selfXSSWarning() {
  console.log(
    '%c** STOP **',
    'font-weight:bold; font: 2.5em Arial; color: white; background-color: #e11d48; padding: 5px 15px; border-radius: 25px;',
  );
  console.log(
    `%cThis is a browser feature intended for developers. Using this console may allow attackers to impersonate you and steal your information. Do not enter or paste code that you do not understand.`,
    'font-weight:bold; font: 2em Arial; color: #e11d48;',
  );
}
