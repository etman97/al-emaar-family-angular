import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ProjectsService, Project } from '../../core/services/projects.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  activeProjectIndex: number = 0;
  activeCategoryIndex: number = 1;
  allProjects: Project[] = [];
  displayedProjects: Project[] = [];

  // Counter animation properties
  projectsCount: number = 0;
  areaCount: number = 0;
  clientsCount: number = 0;
  experienceCount: number = 0;

  private readonly finalValues = {
    projects: 100,
    area: 2,
    clients: 200,
    experience: 30
  };

  private animationStarted = false;

  constructor(
    private elementRef: ElementRef,
    private projectsService: ProjectsService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.allProjects = this.projectsService.getAllProjects();
    this.filterProjectsByCategory();
  }

  ngAfterViewInit() {
    this.setupScrollAnimations();
  }

  navigationButtons = [
    'HOME.PROJECTS.NAV.PREVIOUS',
    'HOME.PROJECTS.NAV.CURRENT',
    'HOME.PROJECTS.NAV.COMPLETED'
  ];

  get currentLang(): 'en' | 'ar' {
    return (this.translate.currentLang === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  }

  toggleProject(index: number): void {
    this.activeProjectIndex = index;
  }

  setActiveCategory(index: number): void {
    this.activeCategoryIndex = index;
    this.activeProjectIndex = 0;
    this.filterProjectsByCategory();
  }

  filterProjectsByCategory(): void {
    let filtered: Project[] = [];
    
    switch (this.activeCategoryIndex) {
      case 0: // Previous (completed)
        filtered = this.allProjects.filter(p => p.category === 'completed');
        break;
      case 1: // Current (ongoing)
        filtered = this.allProjects.filter(p => p.category === 'ongoing');
        break;
      case 2: // Upcoming
        filtered = this.allProjects.filter(p => p.category === 'upcoming');
        break;
    }
    
    // Limit to maximum 4 projects
    this.displayedProjects = filtered.slice(0, 4);
  }

  viewProjectDetails(project: Project): void {
    this.projectsService.setSelectedProject(project);
    this.router.navigate(['/project']);
  }

  private setupScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Check if this is the stats grid and start counter animation
            if (entry.target.classList.contains('stats-grid')) {
              this.startCounterAnimation();
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const animatedElements = this.elementRef.nativeElement.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el: Element) => observer.observe(el));
  }

  private startCounterAnimation() {
    if (this.animationStarted) return;
    this.animationStarted = true;

    const duration = 2000; // 2 seconds
    const steps = 60; // 60 fps
    const increment = duration / steps;

    const animateCounter = (startValue: number, endValue: number, updateCallback: (value: number) => void) => {
      const stepValue = (endValue - startValue) / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const currentValue = Math.floor(startValue + stepValue * currentStep);
        updateCallback(currentValue);

        if (currentStep >= steps) {
          updateCallback(endValue);
          clearInterval(timer);
        }
      }, increment);
    };

    // Start animations with slight delays
    setTimeout(() => animateCounter(0, this.finalValues.projects, (value) => this.projectsCount = value), 0);
    setTimeout(() => animateCounter(0, this.finalValues.area, (value) => this.areaCount = value), 150);
    setTimeout(() => animateCounter(0, this.finalValues.clients, (value) => this.clientsCount = value), 300);
    setTimeout(() => animateCounter(0, this.finalValues.experience, (value) => this.experienceCount = value), 450);
  }
  navigateToContact(){
    window.location.href = '/contact-us';
  }
}
