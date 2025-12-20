import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursorService {
  private cursorCircle: HTMLElement | null = null;
  private mouseX = 0;
  private mouseY = 0;
  private circleX = 0;
  private circleY = 0;
  private animationId: number | null = null;
  private hideTimeout: any = null;

  initCursor() {
    // Create cursor circle element
    this.cursorCircle = document.createElement('div');
    this.cursorCircle.className = 'cursor-circle';
    document.body.appendChild(this.cursorCircle);

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      // Show circle on mouse movement
      if (this.cursorCircle) {
        this.cursorCircle.classList.add('cursor-visible');
      }

      // Clear previous timeout
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
      }

      // Hide circle after 1 second of no movement
      this.hideTimeout = setTimeout(() => {
        if (this.cursorCircle) {
          this.cursorCircle.classList.remove('cursor-visible');
        }
      }, 1000);
    });

    // Start animation loop for trailing circle
    this.animate();

    // Add hover effects
    this.addHoverEffects();
  }

  private animate = () => {
    // Smooth trailing effect using lerp (linear interpolation)
    const speed = 0.15;
    this.circleX += (this.mouseX - this.circleX) * speed;
    this.circleY += (this.mouseY - this.circleY) * speed;

    if (this.cursorCircle) {
      this.cursorCircle.style.left = `${this.circleX}px`;
      this.cursorCircle.style.top = `${this.circleY}px`;
    }

    this.animationId = requestAnimationFrame(this.animate);
  };

  private addHoverEffects() {
    // Add hover effect on clickable elements
    const clickableElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
    
    clickableElements.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        this.cursorCircle?.classList.add('cursor-hover');
      });

      element.addEventListener('mouseleave', () => {
        this.cursorCircle?.classList.remove('cursor-hover');
      });
    });
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
    this.cursorCircle?.remove();
  }
}
