import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { ProjectsService, Project } from '../../core/services/projects.service';

type ProjectStatus = 'all' | 'current' | 'past' | 'upcoming';

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

  constructor(
    private translate: TranslateService,
    private router: Router,
    private projectsService: ProjectsService
  ) {}

  projects: Project[] = [];

  ngOnInit(): void {
    // Load projects from service
    this.projects = this.projectsService.getAllProjects();
    
    // Trigger initial animation
    setTimeout(() => {
      this.isAnimating = true;
    }, 100);
  }

  get currentLang(): 'en' | 'ar' {
    return (this.translate.currentLang === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  }

  getStatus(category: string): ProjectStatus {
    switch (category) {
      case 'ongoing':
        return 'current';
      case 'completed':
        return 'past';
      case 'upcoming':
        return 'upcoming';
      default:
        return 'all';
    }
  }

  get filteredProjects(): Project[] {
    if (this.activeTab === 'all') {
      return this.projects;
    }
    return this.projects.filter(p => this.getStatus(p.category) === this.activeTab);
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

  onProjectClick(project: Project): void {
    this.projectsService.setSelectedProject(project);
    this.router.navigate(['/project']);
  }
}
