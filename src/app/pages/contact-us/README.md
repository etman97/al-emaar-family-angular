# Contact Us Page - Implementation Guide

## Overview
The Contact Us page has been implemented with a responsive design matching the provided specifications, using Bootstrap 5 classes and custom SCSS styling.

## Features

### 1. **Responsive Layout**
- Two-column layout on desktop (image left, form right)
- Stacked layout on mobile devices
- Bootstrap grid system with responsive breakpoints
- RTL (Right-to-Left) support for Arabic content

### 2. **Design Specifications**

#### Image Section
- Max width: 600px
- Max height: 924px
- Border radius: 6px
- Dark overlay: rgba(0, 0, 0, 0.4)
- Position: Relative with absolute overlay
- Includes contact information overlay with:
  - Title: "ابق على تواصل"
  - Phone number with WhatsApp icon
  - Address with location icon
  - Social media icons (Instagram, Facebook, LinkedIn)

#### Main Title - "تواصل معنا"
- Font: Alexandria, 400 weight
- Size: 40px (responsive: 32px on tablet, 28px on mobile)
- Color: #3F5B91
- Line height: 100%
- Text align: Right (RTL)

#### Contact Form Card
- Background: White (#ffffff)
- Border radius: 12px
- Box shadow: Soft shadow for depth
- Padding: Responsive (40px desktop, 20px mobile)
- Title: "قم بمراسلتنا"

#### Form Inputs
- Border radius: 6px
- Font: Alexandria, 16px
- RTL direction
- Focus state: Blue border (#3F5B91)
- Fields:
  - Name (الاسم الكريم)
  - Phone with country code (+966)
  - Message textarea

#### Submit Button - "ارسال"
- Width: Auto (min 112.63px)
- Height: 42px
- Background: #3F5B91
- Color: White
- Font: Alexandria, 16px, 400 weight
- Padding: 10px 14px
- Border radius: 6px
- Hover effect: Darker shade with lift animation
- Disabled state: Gray background
- Icon: Send icon from Bootstrap Icons

#### Map Section
- Title: "أو اقرب فرع"
- Rounded corners
- Shadow effect
- Fully responsive

## Technologies Used
- **Angular 20** (Standalone components)
- **Bootstrap 5.3.8** (Grid, utilities, form controls)
- **Bootstrap Icons** (UI icons)
- **Alexandria Font** (Google Fonts)
- **FormsModule** (Template-driven forms)
- **SCSS** (Custom styling)

## Bootstrap Classes Used

### Layout
- `container-fluid` - Full width container with custom padding
- `row` - Bootstrap grid row
- `col-lg-6` - Half width columns on large screens
- `order-1`, `order-2`, `order-lg-1`, `order-lg-2` - Responsive column ordering
- `min-vh-100` - Minimum viewport height
- `align-items-center` - Vertical centering
- `py-5`, `mb-4`, `mb-lg-0` - Spacing utilities

### Form Components
- `form-control` - Bootstrap form input styling
- `form-control-lg` - Large form controls
- `form-label` - Form label styling
- `input-group` - Grouped input with country code
- `input-group-text` - Country code prefix
- `btn`, `btn-primary` - Button styling

### Utilities
- `d-flex` - Flexbox display
- `gap-3` - Gap between flex items
- `text-white` - White text color
- `text-white-50` - Semi-transparent white
- `img-fluid` - Responsive images
- `rounded` - Border radius
- `ms-2`, `mb-3`, `mt-4` - Margin utilities

## Responsive Breakpoints

```scss
// Desktop (>992px) - Two columns side by side
// Tablet (768px - 992px) - Stacked layout, medium padding
// Mobile (<768px) - Stacked layout, reduced padding and font sizes
```

### Specific Breakpoints:
- **≥1200px**: Full desktop padding (60-80px)
- **992px - 1199px**: Reduced padding, columns start to stack
- **768px - 991px**: Tablet view, reduced font sizes
- **576px - 767px**: Mobile view, smaller padding
- **<576px**: Extra small devices, minimum padding (20px)

## Form Handling

The component includes:
- Two-way data binding with `[(ngModel)]`
- Form validation (required fields)
- Submit handler with console logging
- Success alert message in Arabic
- Form reset after submission
- Button disabled state when form is invalid

## Assets Required

Place the following images in `public/assets/images/`:
1. `contact-building.jpg` - Building/office image for left side
2. `map.jpg` - Map image showing location

## Usage

1. **Import the component in your routes**:
```typescript
import { ContactUs } from './pages/contact-us/contact-us';

export const routes: Routes = [
  { path: 'contact', component: ContactUs },
  // ... other routes
];
```

2. **Navigate to the page**:
```typescript
<a routerLink="/contact">Contact Us</a>
```

3. **Start the development server**:
```bash
npm start
```

## Customization

### Colors
Main colors can be customized in the SCSS file:
- Primary: `#3F5B91`
- White: `#ffffff`
- Text: `#2c3e50`
- Overlay: `rgba(0, 0, 0, 0.4)`

### Fonts
The Alexandria font is loaded from Google Fonts in `styles.scss`.

### API Integration
To connect to a backend API, update the `onSubmit()` method in `contact-us.ts`:

```typescript
onSubmit() {
  if (this.formData.name && this.formData.phone && this.formData.message) {
    // Add your API service here
    this.contactService.sendMessage(this.formData).subscribe(
      response => {
        alert('تم إرسال رسالتك بنجاح!');
        this.resetForm();
      },
      error => {
        console.error('Error:', error);
        alert('حدث خطأ. يرجى المحاولة مرة أخرى.');
      }
    );
  }
}
```

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE 11+ (with polyfills)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility
- Semantic HTML elements
- Form labels properly associated with inputs
- Focus states for interactive elements
- RTL support for Arabic language
- Keyboard navigation support

## Notes
- All text is in Arabic (RTL)
- Form validation is client-side only (add backend validation)
- Images are placeholders (replace with actual assets)
- Submit functionality logs to console (connect to API)
