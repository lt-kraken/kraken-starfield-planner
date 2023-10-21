import { Component } from '@angular/core';
import { faPatreon, faPaypal } from '@fortawesome/free-brands-svg-icons';
import {PersistenceService} from "../../services/persistence.service";
import {SnackbarService} from "../../services/snackbar.service";
import {ApplicationData} from "../../models/v1/application-data";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {

  faPatreon = faPatreon;
  faPayPal = faPaypal;

  constructor(
    private persistenceService: PersistenceService,
    private _snackBar: SnackbarService) {  }

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

  clearCache(): void {
    this.persistenceService.persistApplicationData(new ApplicationData());
    this._snackBar.showMessage(`DEBUG: CLEARED CACHE`, 'red');
  }


}
