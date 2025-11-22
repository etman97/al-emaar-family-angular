import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const firstVisitGuard = () => {
  const router = inject(Router);
  const hasVisited = sessionStorage.getItem('hasVisited');
  
  if (!hasVisited) {
    sessionStorage.setItem('hasVisited', 'true');
    router.navigate(['/loading']);
    return false;
  }
  
  return true;
};
