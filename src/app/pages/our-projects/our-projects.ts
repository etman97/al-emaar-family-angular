import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

type ProjectStatus = 'all' | 'current' | 'past' | 'upcoming';

interface Project {
  id: number;
  name: string;
  image: string;
  status: ProjectStatus;
}
@Component({
  selector: 'app-our-projects',
  imports: [TranslateModule, CommonModule],
  templateUrl: './our-projects.html',
  styleUrl: './our-projects.scss',
  animations: [
    trigger('projectsAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(30px) scale(0.95)' }),
          stagger(60, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', 
              style({ opacity: 1, transform: 'translateY(0) scale(1)' })
            )
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class OurProjects implements OnInit {
activeTab: ProjectStatus = 'all';
  isAnimating = false;

  projects: Project[] = [
    { id: 1, name: 'OUR_PROJECTS.PROJECT_NAME', image: 'assets/p1.png', status: 'current' },
    { id: 2, name: 'OUR_PROJECTS.PROJECT_NAME', image: 'assets/p2.png', status: 'current' },
    { id: 3, name: 'OUR_PROJECTS.PROJECT_NAME', image: 'assets/p3.png', status: 'past' },
    { id: 4, name: 'OUR_PROJECTS.PROJECT_NAME', image: 'assets/p4.png', status: 'past' },
    { id: 5, name: 'OUR_PROJECTS.PROJECT_NAME', image: 'assets/p5.png', status: 'upcoming' },
    { id: 6, name: 'OUR_PROJECTS.PROJECT_NAME', image: 'assets/p1.png', status: 'upcoming' },
    { id: 7, name: 'OUR_PROJECTS.PROJECT_NAME', image: 'assets/p4.png', status: 'current' },
    { id: 8, name: 'OUR_PROJECTS.PROJECT_NAME', image: 'assets/p3.png', status: 'past' }
  ];

  ngOnInit(): void {
    // Trigger initial animation
    setTimeout(() => {
      this.isAnimating = true;
    }, 100);
  }

  get filteredProjects(): Project[] {
    if (this.activeTab === 'all') {
      return this.projects;
    }
    return this.projects.filter(p => p.status === this.activeTab);
  }

  setTab(tab: ProjectStatus): void {
    if (this.activeTab === tab) return;
    
    this.isAnimating = true;
    this.activeTab = tab;
    
    // Reset animation state to allow re-triggering
    setTimeout(() => {
      this.isAnimating = false;
      setTimeout(() => {
        this.isAnimating = true;
      }, 50);
    }, 50);
  }

  getAnimationState(): string {
    return `${this.activeTab}-${this.isAnimating}`;
  }
}
