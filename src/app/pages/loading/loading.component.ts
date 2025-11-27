import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // Set flag before navigation
    sessionStorage.setItem('fromLoading', 'true');
    
    // Navigate to home page after animation completes (3 seconds)
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 3000);
  }
}
