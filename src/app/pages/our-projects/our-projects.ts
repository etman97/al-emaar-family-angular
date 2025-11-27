import { Component, OnInit, HostListener } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { ProjectsService, Project } from '../../core/services/projects.service';
import { FormsModule } from '@angular/forms';

type ProjectStatus = 'all' | 'current' | 'past' | 'upcoming';

@Component({
  selector: 'app-our-projects',
  imports: [TranslateModule, CommonModule, FormsModule],
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

  // Search filters
  searchText: string = '';
  selectedLocation: string = '';
  selectedPropertyType: string = '';
  showLocationDropdown: boolean = false;
  showPropertyTypeDropdown: boolean = false;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private projectsService: ProjectsService
  ) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-wrapper')) {
      this.showLocationDropdown = false;
      this.showPropertyTypeDropdown = false;
    }
  }

  projects: Project[] = [];

  ngOnInit(): void {
    // Load projects from service
    this.projects = this.projectsService.getAllProjects();
    
    // Trigger initial animation
    setTimeout(() => {
      this.isAnimating = true;
    }, 100);
  }

  // Get unique locations from projects
  get uniqueLocations(): Array<{ en: string; ar: string }> {
    const locations = this.projects.map(p => p.location);
    const unique = locations.filter((loc, index, self) => 
      index === self.findIndex(l => l.en === loc.en && l.ar === loc.ar)
    );
    return unique;
  }

  // Get unique property types from projects
  get uniquePropertyTypes(): Array<{ en: string; ar: string }> {
    const types = this.projects.map(p => p.type);
    const unique = types.filter((type, index, self) => 
      index === self.findIndex(t => t.en === type.en && t.ar === type.ar)
    );
    return unique;
  }

  // Toggle dropdown visibility
  toggleLocationDropdown(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.showLocationDropdown = !this.showLocationDropdown;
    this.showPropertyTypeDropdown = false;
    console.log('Location dropdown:', this.showLocationDropdown);
    console.log('Unique locations:', this.uniqueLocations);
  }

  togglePropertyTypeDropdown(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.showPropertyTypeDropdown = !this.showPropertyTypeDropdown;
    this.showLocationDropdown = false;
    console.log('Property type dropdown:', this.showPropertyTypeDropdown);
    console.log('Unique property types:', this.uniquePropertyTypes);
  }

  // Select dropdown options
  selectLocation(location: { en: string; ar: string }): void {
    this.selectedLocation = this.currentLang === 'ar' ? location.ar : location.en;
    this.showLocationDropdown = false;
  }

  selectPropertyType(type: { en: string; ar: string }): void {
    this.selectedPropertyType = this.currentLang === 'ar' ? type.ar : type.en;
    this.showPropertyTypeDropdown = false;
  }

  // Clear filters
  clearLocationFilter(): void {
    this.selectedLocation = '';
  }

  clearPropertyTypeFilter(): void {
    this.selectedPropertyType = '';
  }

  // Search functionality
  performSearch(): void {
    // Trigger animation refresh
    this.isAnimating = false;
    setTimeout(() => {
      this.isAnimating = true;
    }, 50);
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
    let filtered = this.projects;

    // Filter by tab
    if (this.activeTab !== 'all') {
      filtered = filtered.filter(p => this.getStatus(p.category) === this.activeTab);
    }

    // Filter by search text
    if (this.searchText.trim()) {
      const searchLower = this.searchText.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.en.toLowerCase().includes(searchLower) ||
        p.name.ar.toLowerCase().includes(searchLower) ||
        p.location.en.toLowerCase().includes(searchLower) ||
        p.location.ar.toLowerCase().includes(searchLower)
      );
    }

    // Filter by location
    if (this.selectedLocation) {
      filtered = filtered.filter(p => 
        p.location.en === this.selectedLocation || p.location.ar === this.selectedLocation
      );
    }

    // Filter by property type
    if (this.selectedPropertyType) {
      filtered = filtered.filter(p => 
        p.type.en === this.selectedPropertyType || p.type.ar === this.selectedPropertyType
      );
    }

    return filtered;
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
