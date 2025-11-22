import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../core/i18n';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  currentLang: string;

  constructor(
    private translationService: TranslationService,
    private translate: TranslateService
  ) {
    this.currentLang = this.translationService.getSelectedLanguage();
  }

  switchLanguage(lang: string) {
    this.translationService.setLanguage(lang);
    this.currentLang = lang;
  }

  toggleLanguage() {
    const newLang = this.currentLang === 'ar' ? 'en' : 'ar';
    this.switchLanguage(newLang);
  }

  closeNavbar() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse?.classList.contains('show')) {
      const button = document.querySelector('.navbar-toggler') as HTMLElement;
      button?.click();
    }
  }
}
