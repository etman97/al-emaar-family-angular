import { Injectable } from '@angular/core';

declare const emailjs: any;

export interface EmailData {
  from_name: string;
  from_email?: string;
  phone: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailJSService {
  private initialized = false;
  private readonly PUBLIC_KEY = '3OCWh2z8dK60p4sGd';
  private readonly SERVICE_ID = 'service_ca29m2t';
  private readonly TEMPLATE_ID = 'template_f3oofso';

  constructor() {
    this.initEmailJS();
  }

  private initEmailJS(): void {
    if (typeof emailjs !== 'undefined' && !this.initialized) {
      emailjs.init(this.PUBLIC_KEY);
      this.initialized = true;
    }
  }

  async sendEmail(emailData: EmailData): Promise<{ success: boolean; error?: any }> {
    try {
      if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS is not loaded');
      }

      const response = await emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID,
        emailData
      );

      return { success: true };
    } catch (error) {
      console.error('EmailJS Error:', error);
      return { success: false, error };
    }
  }
}
