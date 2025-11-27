import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const firstVisitGuard = () => {
  const router = inject(Router);
  const isFromLoading = sessionStorage.getItem('fromLoading');
  const hasNavigated = sessionStorage.getItem('hasNavigated');
  
  if (isFromLoading) {
    // Coming from loading page - allow access
    sessionStorage.removeItem('fromLoading');
    sessionStorage.setItem('hasNavigated', 'true');
    return true;
  }
  
  if (hasNavigated) {
    // Already navigated in this session - allow direct access
    return true;
  }
  
  // First time accessing (page refresh) - redirect to loading page
  router.navigate(['/']);
  return false;
};
