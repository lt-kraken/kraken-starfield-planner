import { Component } from '@angular/core';
import {faDiscord} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  isExpanded = false;

  faDiscord = faDiscord;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  joinCommunity() {
    const url = 'https://discord.gg/YD5buJcUmZ';
    window.open(url, '_blank');
  }
}
