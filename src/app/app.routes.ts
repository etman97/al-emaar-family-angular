import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactUs } from './pages/contact-us/contact-us';
import { OurCompanies } from './pages/our-companies/our-companies';
import { AboutUs } from './pages/about-us/about-us';
import { OurProjects } from './pages/our-projects/our-projects';
import { Project } from './pages/project/project';
import { LoadingComponent } from './pages/loading/loading.component';
import { firstVisitGuard } from './guards/first-visit.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoadingComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [firstVisitGuard]
  },
  {
    path: 'contact-us',
    component: ContactUs,
    canActivate: [firstVisitGuard]
  },
  {
    path: 'our-partners',
    component: OurCompanies,
    canActivate: [firstVisitGuard]
  },
  {
    path: 'about-us',
    component: AboutUs,
    canActivate: [firstVisitGuard]
  },
  {
    path: 'our-projects',
    component: OurProjects,
    canActivate: [firstVisitGuard]
  },
  {
    path: 'project',
    component: Project,
    canActivate: [firstVisitGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

