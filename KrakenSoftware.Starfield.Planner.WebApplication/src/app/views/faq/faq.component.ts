import { Component } from '@angular/core';
import { faPatreon, faPaypal } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {

  faPatreon = faPatreon;
  faPayPal = faPaypal;

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

  joinCommunity() {
    const url = 'https://discord.gg/YD5buJcUmZ';
    window.open(url, '_blank');
  }
}
