import { Injectable } from '@angular/core';
import {ApplicationData} from "../models/v1/application-data";
import {PlannerComponent} from "../views/planner/planner.component";

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  private DATA_KEY: string = "planner_data";

  constructor() {
  }

  public persistableAction(self: any, data: ApplicationData, action: any): void {
    action(self, data);
    this.persistApplicationData(data);
  }

  public persistApplicationData(data: ApplicationData): void {
    localStorage.setItem(this.DATA_KEY, JSON.stringify(data));
  }

  public getApplicationData(): ApplicationData {
    let current = localStorage.getItem(this.DATA_KEY);
    if (!current || current === 'undefined') {
      return new ApplicationData();
    }

    let result = JSON.parse(current);
    return result;
  }
}
