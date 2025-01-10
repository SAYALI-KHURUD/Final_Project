import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  navigateTo(path: string): void {
    // Simple navigation method if you want to handle navigation in the component
    window.location.href = path;
  }
}
