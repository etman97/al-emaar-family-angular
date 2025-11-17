import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactUs } from './pages/contact-us/contact-us';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'contact-us',
    component: ContactUs
  },
  {
    path: '**',
    redirectTo: ''
  }
];
