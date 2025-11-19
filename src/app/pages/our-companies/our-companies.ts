import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-our-companies',
  imports: [TranslateModule, CommonModule],
  templateUrl: './our-companies.html',
  styleUrl: './our-companies.scss',
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [
        style({ opacity: 0, maxHeight: '0px', overflow: 'hidden' }),
        animate('600ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, maxHeight: '2000px' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, maxHeight: '2000px', overflow: 'hidden' }),
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 0, maxHeight: '0px' }))
      ])
    ])
  ]
})
export class OurCompanies implements OnInit, AfterViewInit {
  showMoreContent = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.setupScrollAnimations();
  }

  toggleContent() {
    this.showMoreContent = !this.showMoreContent;
  }

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
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const animatedElements = this.elementRef.nativeElement.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el: Element) => observer.observe(el));
  }
}
