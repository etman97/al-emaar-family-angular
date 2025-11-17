import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  activeProjectIndex: number = 0;
  activeCategoryIndex: number = 0;

  navigationButtons = [
    'HOME.PROJECTS.NAV.CURRENT',
    'HOME.PROJECTS.NAV.PREVIOUS',
    'HOME.PROJECTS.NAV.COMPLETED'
  ];

  projects = [
    { 
      name: 'HOME.PROJECTS.DETAILS.PROJECT_1.TITLE',
      title: 'HOME.PROJECTS.DETAILS.PROJECT_1.TITLE',
      description: 'HOME.PROJECTS.DETAILS.PROJECT_1.DESCRIPTION',
      image: 'assets/image1.png'
    },
    { 
      name: 'HOME.PROJECTS.DETAILS.PROJECT_2.TITLE',
      title: 'HOME.PROJECTS.DETAILS.PROJECT_2.TITLE',
      description: 'HOME.PROJECTS.DETAILS.PROJECT_2.DESCRIPTION',
      image: 'assets/image2.png'
    },
    { 
      name: 'HOME.PROJECTS.DETAILS.PROJECT_3.TITLE',
      title: 'HOME.PROJECTS.DETAILS.PROJECT_3.TITLE',
      description: 'HOME.PROJECTS.DETAILS.PROJECT_3.DESCRIPTION',
      image: 'assets/image3.png'
    },
    { 
      name: 'HOME.PROJECTS.DETAILS.PROJECT_4.TITLE',
      title: 'HOME.PROJECTS.DETAILS.PROJECT_4.TITLE',
      description: 'HOME.PROJECTS.DETAILS.PROJECT_4.DESCRIPTION',
      image: 'assets/image4.png'
    }
  ];

  toggleProject(index: number): void {
    this.activeProjectIndex = index;
  }

  setActiveCategory(index: number): void {
    this.activeCategoryIndex = index;
  }
}
