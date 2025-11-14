# Translation Guide

## Overview
This project uses `@ngx-translate/core` for internationalization (i18n) supporting English (en) and Arabic (ar) languages with RTL support.

## Translation Key Format

Always use **UPPERCASE_UNDERSCORE** format for all translation keys:
```
MODULE.CATEGORY.KEY
```

## Key Structure

### General Keys (GENERAL.*)
Use for reusable labels across the application:
```typescript
GENERAL.SAVE
GENERAL.CANCEL
GENERAL.ACTIVE
GENERAL.INACTIVE
```

### Module-Specific Keys
Follow this structure for each module:

```typescript
MODULE_NAME: {
  TITLE: 'Module Title',
  
  FORM: {
    FIELD_NAME: {
      LABEL: 'Field Label',
      PLACEHOLDER: 'Field Placeholder',
      ERROR: 'Error Message',
    },
  },
  
  FILTERS: {
    SEARCH_PLACEHOLDER: 'Search placeholder',
  },
  
  VALIDATION: {
    REQUIRED: 'Validation message',
  },
  
  ADDED: 'Success message for adding',
  EDITED: 'Success message for editing',
  DELETED: 'Success message for deleting',
}
```

## Usage Examples

### In HTML Templates
Use the `translate` pipe:

```html
<!-- Simple translation -->
<button>{{ 'GENERAL.SAVE' | translate }}</button>

<!-- With parameters -->
<p>{{ 'GENERAL.MIN_LENGTH' | translate: {min: 5} }}</p>

<!-- Form labels -->
<label>{{ 'USER.FORM.NAME.LABEL' | translate }}</label>
<input [placeholder]="'USER.FORM.NAME.PLACEHOLDER' | translate">
```

### In TypeScript Components
Inject `TranslateService` and use `instant()`:

```typescript
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-example',
  template: '...'
})
export class ExampleComponent {
  constructor(private translate: TranslateService) {}

  showMessage() {
    // Simple translation
    const message = this.translate.instant('GENERAL.SUCCESS');
    
    // With parameters
    const minLength = this.translate.instant('GENERAL.MIN_LENGTH', { min: 5 });
    
    // In form configs
    const formConfig = {
      label: this.translate.instant('USER.FORM.NAME.LABEL'),
      placeholder: this.translate.instant('USER.FORM.NAME.PLACEHOLDER'),
    };
  }
}
```

### Language Switching
```typescript
import { TranslationService } from './core/i18n';

export class LanguageSwitcher {
  constructor(private translationService: TranslationService) {}

  switchToArabic() {
    this.translationService.setLanguage('ar');
  }

  switchToEnglish() {
    this.translationService.setLanguage('en');
  }

  getCurrentLanguage() {
    return this.translationService.getSelectedLanguage();
  }
}
```

## Adding New Translations

### Step 1: Add to en.ts
```typescript
// src/app/core/i18n/vocabs/en.ts
export const locale = {
  lang: 'en',
  data: {
    USER: {
      TITLE: 'Users',
      FORM: {
        NAME: {
          LABEL: 'Name',
          PLACEHOLDER: 'Enter name',
          ERROR: 'Name is required',
        },
      },
      ADDED: 'User added successfully',
      EDITED: 'User updated successfully',
    },
  },
};
```

### Step 2: Add to ar.ts
```typescript
// src/app/core/i18n/vocabs/ar.ts
export const locale = {
  lang: 'ar',
  data: {
    USER: {
      TITLE: 'المستخدمون',
      FORM: {
        NAME: {
          LABEL: 'الاسم',
          PLACEHOLDER: 'أدخل الاسم',
          ERROR: 'الاسم مطلوب',
        },
      },
      ADDED: 'تمت إضافة المستخدم بنجاح',
      EDITED: 'تم تحديث المستخدم بنجاح',
    },
  },
};
```

## Best Practices

1. **Always update both en.ts and ar.ts simultaneously**
2. **Use GENERAL keys for common labels** (SAVE, CANCEL, ACTIVE, INACTIVE)
3. **Never use hardcoded text** - everything must be translatable
4. **Use parameterized translations** for dynamic content:
   ```typescript
   this.translate.instant('MESSAGE', { name: userName })
   ```
5. **Follow the key naming convention**:
   - `MODULE.FORM.FIELD.{LABEL|PLACEHOLDER|ERROR}`
   - `MODULE.FILTERS.*`
   - `MODULE.VALIDATION.*`
   - `MODULE.{ADDED|EDITED|DELETED}`

6. **Never create duplicate keys** - check if a GENERAL equivalent exists first

7. **Test both languages** before completing any feature

## RTL Support

The application automatically handles RTL layout for Arabic:
- Direction changes to RTL when Arabic is selected
- CSS classes added: `rtl`, `lang-ar`
- Custom RTL styles can be added to `styles-rtl.css`

## File Structure

```
src/app/core/
├── i18n/
│   ├── vocabs/
│   │   ├── en.ts          # English translations
│   │   └── ar.ts          # Arabic translations
│   ├── translation.service.ts
│   ├── translation.module.ts
│   └── index.ts
└── services/
    └── style.service.ts    # RTL/LTR style management
```

## Common Patterns

### Form Validation Messages
```typescript
// en.ts
VALIDATION: {
  REQUIRED: 'This field is required',
  EMAIL: 'Invalid email address',
  MIN_LENGTH: 'Minimum {{min}} characters',
  MAX_LENGTH: 'Maximum {{max}} characters',
}

// Usage
validators: [
  { validator: Validators.required, message: 'MODULE.VALIDATION.REQUIRED' }
]
```

### Success/Error Messages
```typescript
// Show success message
this.toast.success(
  this.translate.instant('USER.ADDED')
);

// Show error with details
this.toast.error(
  this.translate.instant('GENERAL.ERROR')
);
```

### Table Headers
```html
<th>{{ 'GENERAL.NAME' | translate }}</th>
<th>{{ 'GENERAL.STATUS' | translate }}</th>
<th>{{ 'GENERAL.ACTIONS' | translate }}</th>
```
