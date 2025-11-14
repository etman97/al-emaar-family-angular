import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StylesChangerService } from '../services/style.service';

export interface Locale {
  lang: string;
  data: any;
}

const LOCALIZATION_LOCAL_STORAGE_KEY = 'language';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private langIds: string[] = [];
  private rtlLangs: string[] = ['ar'];

  constructor(
    private readonly translate: TranslateService,
    private readonly styleChanger: StylesChangerService,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    // Declare supported base languages
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('ar');

    const storedLang = localStorage.getItem(LOCALIZATION_LOCAL_STORAGE_KEY) || 'ar';
    this.getStyles();
    this.translate.onLangChange.subscribe(() => {
      this.getStyles();
    });
    this.setLanguage(storedLang);
  }

  /**
   * Set the current language
   */
  setLanguage(lang: string): void {
    if (!lang) return;

    localStorage.setItem(LOCALIZATION_LOCAL_STORAGE_KEY, lang);
    this.translate.use(lang);

    const isRtl = this.rtlLangs.includes(lang);
    this.document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    this.document.documentElement.setAttribute('lang', lang);
    this.document.body.classList.toggle('rtl', isRtl);
    this.document.body.classList.toggle('lang-ar', lang === 'ar');
  }

  private getStyles() {
    const isRtl = this.rtlLangs.includes(this.translate.currentLang);
    if (isRtl) {
      this.styleChanger.loadStyle('rtl');
      this.document.documentElement.setAttribute('dir', 'rtl');
      this.document.documentElement.setAttribute('direction', 'rtl');
    } else {
      this.styleChanger.loadStyle('ltr');
      this.document.documentElement.setAttribute('dir', 'ltr');
      this.document.documentElement.setAttribute('direction', 'ltr');
    }
  }

  /**
   * Load translations
   */
  loadTranslations(...locales: Locale[]): void {
    const langGroups = new Map<string, any>();

    for (const { lang, data } of locales) {
      const existing = langGroups.get(lang) || {};
      langGroups.set(lang, { ...existing, ...data });

      if (!this.langIds.includes(lang)) {
        this.langIds.push(lang);
      }
    }

    langGroups.forEach((mergedData, lang) => {
      this.translate.setTranslation(lang, mergedData, true);
    });

    this.translate.addLangs(this.langIds);
  }

  getSelectedLanguage(): string {
    return localStorage.getItem(LOCALIZATION_LOCAL_STORAGE_KEY) || 'ar';
  }
}
