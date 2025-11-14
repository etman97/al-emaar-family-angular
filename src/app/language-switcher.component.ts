import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from './core/i18n';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [TranslateModule],
  template: `
    <div class="language-switcher">
      <button (click)="switchLanguage('en')" [class.active]="currentLang === 'en'">
        English
      </button>
      <button (click)="switchLanguage('ar')" [class.active]="currentLang === 'ar'">
        العربية
      </button>
    </div>
    
    <!-- Example translations -->
    <div class="example-content">
      <h1>{{ 'EXAMPLE_MODULE.TITLE' | translate }}</h1>
      <button class="btn btn-primary">{{ 'GENERAL.SAVE' | translate }}</button>
      <button class="btn btn-secondary">{{ 'GENERAL.CANCEL' | translate }}</button>
      <p>{{ 'GENERAL.MIN_LENGTH' | translate: {min: 5} }}</p>
    </div>
  `,
  styles: [`
    .language-switcher {
      display: flex;
      gap: 10px;
      padding: 20px;
    }
    
    .language-switcher button {
      padding: 8px 16px;
      border: 1px solid #ccc;
      background: white;
      cursor: pointer;
      border-radius: 4px;
    }
    
    .language-switcher button.active {
      background: #007bff;
      color: white;
      border-color: #007bff;
    }
    
    .example-content {
      padding: 20px;
    }
    
    .btn {
      padding: 8px 16px;
      margin: 5px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .btn-primary {
      background: #007bff;
      color: white;
    }
    
    .btn-secondary {
      background: #6c757d;
      color: white;
    }
  `]
})
export class LanguageSwitcherComponent {
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
}
