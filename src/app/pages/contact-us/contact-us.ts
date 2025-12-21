import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslationModule } from '../../core/i18n/translation.module';
import { Subscription } from 'rxjs';
import { animate, group, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { EmailJSService } from '../../core/services/emailjs.service';

declare const Toastify: any;

@Component({
  selector: 'app-contact-us',
  imports: [CommonModule, FormsModule, TranslationModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.scss',
  animations: [
    trigger('formFade', [
      state('hidden', style({ opacity: 0, transform: 'translateY(32px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', [
        group([
          animate(
            '720ms cubic-bezier(0.22, 0.61, 0.36, 1)',
            keyframes([
              style({ opacity: 0, transform: 'translateY(48px)', offset: 0 }),
              style({ opacity: 1, transform: 'translateY(-6px)', offset: 0.7 }),
              style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
            ])
          ),
          query(
            '.section-heading, form .row, form button[type="submit"], .map-section',
            [
              style({ opacity: 0, transform: 'translateY(24px)' }),
              stagger(
                110,
                animate(
                  '520ms 160ms cubic-bezier(0.33, 1, 0.68, 1)',
                  style({ opacity: 1, transform: 'translateY(0)' })
                )
              )
            ],
            { optional: true }
          ),
          query(
            'form .custom-input, form textarea',
            [
              style({ opacity: 0, transform: 'translateY(18px)' }),
              stagger(
                80,
                animate(
                  '420ms 220ms cubic-bezier(0.4, 0, 0.2, 1)',
                  style({ opacity: 1, transform: 'translateY(0)' })
                )
              )
            ],
            { optional: true }
          )
        ])
      ])
    ]),
    trigger('imageFade', [
      state('hidden', style({ opacity: 0, transform: 'translateY(32px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', [
        group([
          animate(
            '840ms cubic-bezier(0.22, 0.61, 0.36, 1)',
            keyframes([
              style({ opacity: 0, transform: 'translateY(52px)', offset: 0 }),
              style({ opacity: 1, transform: 'translateY(-10px)', offset: 0.65 }),
              style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
            ])
          ),
          query(
            '.image-wrapper img',
            [
              style({ transform: 'scale(1.12)', opacity: 0 }),
              animate(
                '900ms 120ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                style({ transform: 'scale(1)', opacity: 1 })
              )
            ],
            { optional: true }
          ),
          query(
            '.contact-info-overlay .overlay-content > *',
            [
              style({ opacity: 0, transform: 'translateY(24px)' }),
              stagger(
                100,
                animate(
                  '460ms 260ms cubic-bezier(0.4, 0, 0.2, 1)',
                  style({ opacity: 1, transform: 'translateY(0)' })
                )
              )
            ],
            { optional: true }
          ),
          query(
            '.social-icons a',
            [
              style({ opacity: 0, transform: 'translateY(18px) scale(0.9)' }),
              stagger(
                90,
                animate(
                  '380ms 420ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                  style({ opacity: 1, transform: 'translateY(0) scale(1)' })
                )
              )
            ],
            { optional: true }
          )
        ])
      ])
    ])
  ]
})
export class ContactUs implements OnInit, OnDestroy {
  direction: 'rtl' | 'ltr';
  private langChangeSub: Subscription;
  formAnimationState: 'hidden' | 'visible' = 'hidden';
  imageAnimationState: 'hidden' | 'visible' = 'hidden';
  isSubmitting = false;

  // Validation patterns
  private validationPatterns = {
    name: /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/,
    phone: /^[+]?[0-9\s\-()]{10,20}$/,
  };

  // Error states
  errors = {
    firstName: '',
    lastName: '',
    phone: '',
    message: ''
  };

  constructor(
    private translate: TranslateService,
    private emailService: EmailJSService
  ) {
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

  // Validation methods
  validateField(fieldName: 'firstName' | 'lastName' | 'phone' | 'message'): boolean {
    const value = this.formData[fieldName];
    let isValid = true;

    if (!value.trim()) {
      this.errors[fieldName] = this.translate.instant(`CONTACT.ERRORS.${fieldName.toUpperCase()}_REQUIRED`);
      isValid = false;
    } else {
      switch (fieldName) {
        case 'firstName':
        case 'lastName':
          if (!this.validationPatterns.name.test(value.trim())) {
            this.errors[fieldName] = this.translate.instant(`CONTACT.ERRORS.${fieldName.toUpperCase()}_INVALID`);
            isValid = false;
          } else {
            this.errors[fieldName] = '';
          }
          break;
        case 'phone':
          if (!this.validationPatterns.phone.test(value.trim())) {
            this.errors[fieldName] = this.translate.instant('CONTACT.ERRORS.PHONE_INVALID');
            isValid = false;
          } else {
            this.errors[fieldName] = '';
          }
          break;
        case 'message':
          if (value.trim().length < 10) {
            this.errors[fieldName] = this.translate.instant('CONTACT.ERRORS.MESSAGE_INVALID');
            isValid = false;
          } else {
            this.errors[fieldName] = '';
          }
          break;
      }
    }

    return isValid;
  }

  validateForm(): boolean {
    const fields: ('firstName' | 'lastName' | 'phone' | 'message')[] = ['firstName', 'lastName', 'phone', 'message'];
    let isFormValid = true;

    fields.forEach(field => {
      if (!this.validateField(field)) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  clearError(fieldName: 'firstName' | 'lastName' | 'phone' | 'message'): void {
    this.errors[fieldName] = '';
  }

  showToast(message: string, type: 'success' | 'error' = 'success'): void {
    if (typeof Toastify !== 'undefined') {
      Toastify({
        text: message,
        duration: 5000,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        close: false,
        className: type,
        style: {
          background: type === 'success' 
            ? 'linear-gradient(to right, #00b09b, #96c93d)' 
            : 'linear-gradient(to right, #ff5f6d, #ffc371)'
        }
      }).showToast();
    }
  }

  async onSubmit() {
    if (!this.validateForm()) {
      this.showToast(
        this.translate.instant('CONTACT.ERRORS.FORM_INVALID'),
        'error'
      );
      return;
    }

    if (this.isSubmitting) return;

    this.isSubmitting = true;

    const { firstName, lastName, phone, message } = this.formData;
    const emailData = {
      from_name: `${firstName} ${lastName}`.trim(),
      phone: `${this.selectedCountry.dialCode} ${phone}`.trim(),
      message: message
    };

    try {
      const result = await this.emailService.sendEmail(emailData);

      if (result.success) {
        this.showToast(
          this.translate.instant('CONTACT.FORM.SUCCESS'),
          'success'
        );
        this.resetForm();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      this.showToast(
        this.translate.instant('CONTACT.ERRORS.SEND_FAILED'),
        'error'
      );
    } finally {
      this.isSubmitting = false;
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

  ngOnInit(): void {
    setTimeout(() => {
      this.formAnimationState = 'visible';
      this.imageAnimationState = 'visible';
    }, 0);
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
