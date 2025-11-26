import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  activeProjectIndex: number = 0;
  activeCategoryIndex: number = 0;

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

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.setupScrollAnimations();
  }

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
