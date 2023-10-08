import { Component } from '@angular/core';
import { faPatreon, faPaypal } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  faPatreon = faPatreon;
  faPayPal = faPaypal;

  getYear(): number {
    return new Date().getFullYear();
  }

  openPatreon() {
    const url = 'https://patreon.com/krakensoftware';
    window.open(url, '_blank');
  }

  openPaypal() {
    const url = 'https://www.paypal.com/donate/?hosted_button_id=B4TL7J97B56MS';
    window.open(url, '_blank');
  }

  openBuyMeACoffee() {
    const url = 'https://buymeacoffee.com/krakensoftware';
    window.open(url, '_blank');
  }
}
