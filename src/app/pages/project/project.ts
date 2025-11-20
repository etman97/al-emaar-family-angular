import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './project.html',
  styleUrl: './project.scss',
})
export class Project implements OnDestroy {
  private translate = inject(TranslateService);
  lang: string = this.translate.currentLang || 'ar';
  private langSub: Subscription = this.translate.onLangChange.subscribe(({ lang }) => {
    this.lang = lang;
  });
  
  totalArea = 300000;
  officesCount = 120000;
  parkingCount = 9;
  
  heroImages = [
    'assets/project.png',
    'assets/p1.png',
    'assets/project.png',
    'assets/p2.png'
  ];
  currentImageIndex = 0;
  isTransitioning = false;
  
  // Touch swipe handling
  private touchStartX = 0;
  private touchEndX = 0;
  private touchStartTime = 0;
  
  get currentHeroImage(): string {
    return this.heroImages[this.currentImageIndex];
  }
  
  nextImage(): void {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentImageIndex = (this.currentImageIndex + 1) % this.heroImages.length;
    setTimeout(() => this.isTransitioning = false, 500);
  }
  
  prevImage(): void {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentImageIndex = this.currentImageIndex === 0 
      ? this.heroImages.length - 1 
      : this.currentImageIndex - 1;
    setTimeout(() => this.isTransitioning = false, 500);
  }
  
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartTime = Date.now();
  }
  
  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].clientX;
    this.handleSwipe();
  }
  
  private handleSwipe(): void {
    const swipeDistance = this.touchStartX - this.touchEndX;
    const swipeTime = Date.now() - this.touchStartTime;
    const velocity = Math.abs(swipeDistance) / swipeTime;
    
    // Lower threshold for fast swipes, higher for slow swipes
    const threshold = velocity > 0.5 ? 30 : 50;
    
    if (Math.abs(swipeDistance) > threshold && !this.isTransitioning) {
      if (swipeDistance > 0) {
        // Swiped left - next image
        this.nextImage();
      } else {
        // Swiped right - previous image
        this.prevImage();
      }
    }
  }
  
  units = [
    { 
      title: { ar: 'مكتب 1', en: 'Office 1' }, 
      code: '12345789', 
      area: 100, 
      floor: { ar: 'الأول', en: 'First' }
    },
    { 
      title: { ar: 'مكتب 2', en: 'Office 2' }, 
      code: '12345790', 
      area: 120, 
      floor: { ar: 'الثاني', en: 'Second' }
    },
    { 
      title: { ar: 'مكتب 3', en: 'Office 3' }, 
      code: '12345791', 
      area: 150, 
      floor: { ar: 'الثالث', en: 'Third' }
    },
    { 
      title: { ar: 'مكتب 4', en: 'Office 4' }, 
      code: '12345792', 
      area: 100, 
      floor: { ar: 'الأول', en: 'First' }
    },
    { 
      title: { ar: 'مكتب 5', en: 'Office 5' }, 
      code: '12345793', 
      area: 130, 
      floor: { ar: 'الثاني', en: 'Second' }
    },
    { 
      title: { ar: 'مكتب 6', en: 'Office 6' }, 
      code: '12345794', 
      area: 140, 
      floor: { ar: 'الثالث', en: 'Third' }
    },
    { 
      title: { ar: 'مكتب 7', en: 'Office 7' }, 
      code: '12345795', 
      area: 110, 
      floor: { ar: 'الأول', en: 'First' }
    }
  ];

  getTranslatedValue(value: { ar: string; en: string }): string {
    const lang = this.translate.currentLang || 'ar';
    return value[lang as 'ar' | 'en'] || value.ar;
  }

  ngOnDestroy(): void {
    if (this.langSub) {
      this.langSub.unsubscribe();
    }
  }
}
