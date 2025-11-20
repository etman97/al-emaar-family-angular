import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactUs } from './pages/contact-us/contact-us';
import { OurCompanies } from './pages/our-companies/our-companies';
import { AboutUs } from './pages/about-us/about-us';
import { OurProjects } from './pages/our-projects/our-projects';
import { Project } from './pages/project/project';

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
    path: 'our-companies',
    component: OurCompanies
  },
  {
    path: 'about-us',
    component: AboutUs
  },
  {
    path: 'our-projects',
    component: OurProjects
  },
  {
    path: 'project',
    component: Project
  },
  {
    path: '**',
    redirectTo: ''
  }
];
