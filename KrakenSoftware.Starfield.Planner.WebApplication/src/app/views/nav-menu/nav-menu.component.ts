import { Component } from '@angular/core';
import {faDiscord, faPatreon} from "@fortawesome/free-brands-svg-icons";
import {faSquareArrowUpRight} from "@fortawesome/free-solid-svg-icons";

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

  openStatusPage() {
    const url = 'https://stats.uptimerobot.com/19rynu6ARY';
    window.open(url, '_blank');
  }

  protected readonly faPatreon = faPatreon;
  protected readonly faSquareArrowUpRight = faSquareArrowUpRight;
}
