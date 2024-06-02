import { Component, OnInit } from '@angular/core';
import { faPatreon, faPaypal } from '@fortawesome/free-brands-svg-icons';
import {Observable} from "rxjs";
import {ApiClientService} from "./services/api-client.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  faPatreon = faPatreon;
  faPayPal = faPaypal;
  backendAvailable$!: Observable<boolean | null>;

  constructor(private apiClientService: ApiClientService) {
    this.backendAvailable$ = this.apiClientService.getBackendStatus();
  }

  ngOnInit() {
    this.apiClientService.checkBackendAvailability();
  }

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

  joinCommunity() {
    const url = 'https://discord.gg/YD5buJcUmZ';
    window.open(url, '_blank');
  }
}
