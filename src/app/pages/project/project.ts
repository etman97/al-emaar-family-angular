import { Component, inject, OnDestroy, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ProjectsService, Project as ProjectData, ProjectUnit } from '../../core/services/projects.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './project.html',
  styleUrl: './project.scss',
})
export class Project implements OnDestroy, OnInit {
  private translate = inject(TranslateService);
  private projectsService = inject(ProjectsService);
  
  lang: string = this.translate.currentLang || 'ar';
  private langSub: Subscription = this.translate.onLangChange.subscribe(({ lang }) => {
    this.lang = lang;
  });
  
  // Project data
  selectedProject: ProjectData | null = null;
  projectName: { en: string; ar: string } = { en: '', ar: '' };
  projectLocation: { en: string; ar: string } = { en: '', ar: '' };
  projectLocationUrl: string = '';
  projectType: { en: string; ar: string } = { en: '', ar: '' };
  projectDescription: { en: string; ar: string } = { en: '', ar: '' };
  totalArea: string = '0';
  
  // Dynamic stats
  get visibleStats() {
    if (!this.selectedProject) return [];
    const stats = this.selectedProject.stats;
    const result = [];
    
    if (stats.offices > 0) result.push({ label: 'OFFICE', value: stats.offices, icon: 'house.svg' });
    if (stats.parkings > 0) result.push({ label: 'PARKING', value: stats.parkings, icon: 'car.svg' });
    if (stats.villas > 0) result.push({ label: 'VILLAS', value: stats.villas, icon: 'house.svg' });
    if (stats.models > 0) result.push({ label: 'MODELS', value: stats.models, icon: 'house.svg' });
    if (stats.units > 0) result.push({ label: 'UNITS', value: stats.units, icon: 'house.svg' });
    if (stats.exhibitionsShowrooms > 0) result.push({ label: 'SHOWROOMS', value: stats.exhibitionsShowrooms, icon: 'house.svg' });
    if (stats.floors > 0) result.push({ label: 'FLOORS', value: stats.floors, icon: 'Buildings.svg' });
    
    return result;
  }
  
  units: ProjectUnit[] = [];
  
  ngOnInit(): void {
    // Load selected project
    this.selectedProject = this.projectsService.getSelectedProject();
    
    if (this.selectedProject) {
      this.projectName = this.selectedProject.name;
      this.projectLocation = this.selectedProject.location;
      this.projectLocationUrl = this.selectedProject.locationUrl;
      this.projectType = this.selectedProject.type;
      this.projectDescription = this.selectedProject.description;
      this.totalArea = this.selectedProject.area;
      this.units = this.selectedProject.Units;
      
      // Set hero images if available
      if (this.selectedProject.images && this.selectedProject.images.length > 0) {
        this.heroImages = this.selectedProject.images;
      } else if (this.selectedProject.image) {
        this.heroImages = [this.selectedProject.image];
      }
    }
  }
  
  heroImages: string[] = ['assets/project.png'];
  currentImageIndex = 0;
  isTransitioning = false;
  
  // Lightbox state
  isLightboxOpen = false;
  lightboxImageIndex = 0;
  
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
    const swipeDistance = Math.abs(this.touchStartX - this.touchEndX);
    const touchDuration = Date.now() - this.touchStartTime;
    
    // If it's a tap (minimal movement and quick), open lightbox
    if (swipeDistance < 10 && touchDuration < 300) {
      this.openLightbox(this.currentImageIndex);
      return;
    }
    
    // Otherwise handle as swipe
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
  
  openLocation(): void {
    if (this.projectLocationUrl) {
      window.open(this.projectLocationUrl, '_blank');
    }
  }
  
  // Lightbox methods
  openLightbox(index: number): void {
    this.lightboxImageIndex = index;
    this.isLightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }
  
  closeLightbox(): void {
    this.isLightboxOpen = false;
    document.body.style.overflow = '';
  }
  
  nextLightboxImage(): void {
    this.lightboxImageIndex = (this.lightboxImageIndex + 1) % this.heroImages.length;
  }
  
  prevLightboxImage(): void {
    this.lightboxImageIndex = this.lightboxImageIndex === 0 
      ? this.heroImages.length - 1 
      : this.lightboxImageIndex - 1;
  }
  
  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.isLightboxOpen) {
      this.closeLightbox();
    }
  }
  
  @HostListener('document:keydown.arrowleft')
  handleArrowLeft(): void {
    if (this.isLightboxOpen) {
      this.nextLightboxImage();
    }
  }
  
  @HostListener('document:keydown.arrowright')
  handleArrowRight(): void {
    if (this.isLightboxOpen) {
      this.prevLightboxImage();
    }
  }
  
  getProjectValue(obj: { en: string; ar: string }): string {
    const currentLang = this.lang as 'en' | 'ar';
    return obj[currentLang] || obj.ar || obj.en;
  }
  
  ngOnDestroy(): void {
    if (this.langSub) {
      this.langSub.unsubscribe();
    }
  }
}
