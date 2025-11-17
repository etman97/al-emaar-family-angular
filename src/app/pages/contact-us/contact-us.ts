import { Component, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslationModule } from '../../core/i18n/translation.module';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-us',
  imports: [CommonModule, FormsModule, TranslationModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.scss',
})
export class ContactUs implements OnDestroy {
  direction: 'rtl' | 'ltr';
  private langChangeSub: Subscription;

  constructor(private translate: TranslateService) {
    this.direction = this.getDirection(this.translate.currentLang || this.translate.getDefaultLang());
    this.langChangeSub = this.translate.onLangChange.subscribe(({ lang }) => {
      this.direction = this.getDirection(lang);
    });
  }

  countries = [
    {
      code: 'SA',
      nameKey: 'CONTACT.COUNTRIES.SA',
      dialCode: '+966',
      flag: 'assets/icons/saudi-flag.svg'
    },
    {
      code: 'EG',
      nameKey: 'CONTACT.COUNTRIES.EG',
      dialCode: '+20',
      flag: 'assets/icons/egypt-flag.svg'
    },
    {
      code: 'AE',
      nameKey: 'CONTACT.COUNTRIES.AE',
      dialCode: '+971',
      flag: 'assets/icons/uae-flag.svg'
    }
  ];

  selectedCountry = this.countries[0];
  countryDropdownOpen = false;

  formData = {
    firstName: '',
    lastName: '',
    phone: '',
    message: '',
    countryCode: this.selectedCountry.code
  };

  onSubmit() {
    const { firstName, lastName, phone, message } = this.formData;
    if (firstName && lastName && phone && message) {
      const payload = {
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`.trim(),
        phone: `${this.selectedCountry.dialCode} ${phone}`.trim(),
        rawPhone: phone,
        country: this.selectedCountry.code,
        countryName: this.translate.instant(this.selectedCountry.nameKey),
        message
      };

      console.log('Form submitted:', payload);
      // Here you can add your API call to send the data
      alert(this.translate.instant('CONTACT.FORM.SUCCESS'));
      this.resetForm();
    }
  }

  resetForm() {
    this.formData = {
      firstName: '',
      lastName: '',
      phone: '',
      message: '',
      countryCode: this.countries[0].code
    };
    this.selectedCountry = this.countries[0];
    this.countryDropdownOpen = false;
  }

  toggleCountryDropdown() {
    this.countryDropdownOpen = !this.countryDropdownOpen;
  }

  selectCountry(country: { code: string; nameKey: string; dialCode: string; flag: string }) {
    this.selectedCountry = country;
    this.formData.countryCode = country.code;
    this.countryDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.countryDropdownOpen) {
      return;
    }

    const target = event.target as HTMLElement;
    if (!target.closest('.phone-input')) {
      this.countryDropdownOpen = false;
    }
  }

  ngOnDestroy() {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }

  private getDirection(lang?: string | null): 'rtl' | 'ltr' {
    return lang === 'ar' ? 'rtl' : 'ltr';
  }
}
