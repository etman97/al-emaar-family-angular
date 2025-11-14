import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StylesChangerService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  loadStyle(styleName: string): void {
    const head = this.document.getElementsByTagName('head')[0];
    
    // Remove existing RTL/LTR style links
    const existingLinks = this.document.querySelectorAll('link[data-style-type]');
    existingLinks.forEach(link => link.remove());

    // Add new style link if needed
    if (styleName === 'rtl') {
      const style = this.document.createElement('link');
      style.id = 'rtl-style';
      style.rel = 'stylesheet';
      style.href = 'styles-rtl.css'; // You can create this file for RTL-specific styles
      style.setAttribute('data-style-type', 'rtl');
      head.appendChild(style);
    }
  }
}
