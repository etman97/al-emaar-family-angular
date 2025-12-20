import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslationService } from './core/i18n';
import { locale as enLang } from './core/i18n/vocabs/en';
import { locale as arLang } from './core/i18n/vocabs/ar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CursorService } from './core/services/cursor.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('Emmar');

  constructor(
    private translationService: TranslationService,
    private cursorService: CursorService
  ) {
    // Load translations
    this.translationService.loadTranslations(enLang, arLang);
  }

  ngOnInit(): void {
    // Initialize custom cursor effect
    this.cursorService.initCursor();
  }

  ngOnDestroy(): void {
    // Clean up cursor effect
    this.cursorService.destroy();
  }
}
