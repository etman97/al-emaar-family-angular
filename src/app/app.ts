import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslationService } from './core/i18n';
import { locale as enLang } from './core/i18n/vocabs/en';
import { locale as arLang } from './core/i18n/vocabs/ar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Emmar');

  constructor(private translationService: TranslationService) {
    // Load translations
    this.translationService.loadTranslations(enLang, arLang);
  }

  ngOnInit(): void {
    // Language is already set in TranslationService constructor
  }
}
