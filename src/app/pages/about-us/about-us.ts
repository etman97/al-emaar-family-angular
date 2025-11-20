import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  imports: [TranslateModule, CommonModule],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUs implements OnInit, AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.setupScrollAnimations();
  }
  values: any[] = [
    {
      title: 'ABOUT_US.VALUES.VISION.TITLE',
      icon: 'assets/steps.png',
      text: 'ABOUT_US.VALUES.VISION.DESCRIPTION',
    },
    {
      title: 'ABOUT_US.VALUES.MISSION.TITLE',
      icon: 'assets/Group (1).png',
      text: 'ABOUT_US.VALUES.MISSION.DESCRIPTION',
    },
    {
      title: 'ABOUT_US.VALUES.GOAL.TITLE',
      icon: 'assets/target.png',
      text: 'ABOUT_US.VALUES.GOAL.DESCRIPTION',
    },
    {
      title: 'ABOUT_US.VALUES.VALUES.TITLE',
      icon: 'assets/Dimond.png',
      text: 'ABOUT_US.VALUES.VALUES.DESCRIPTION',
    },
  ];
  private setupScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
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
}
