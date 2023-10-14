import { Injectable } from '@angular/core';
import {ApplicationData} from "../models/v1/application-data";

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  private DATA_KEY: string = "planner_data";

  constructor() {
  }

  public persistableAction(data: ApplicationData, action: any): void {
    action();
    this.persistApplicationData(data);
  }

  public persistApplicationData(data: ApplicationData): void {
    localStorage.setItem(this.DATA_KEY, JSON.stringify(data));
  }

  public getApplicationData(useMockIfEmpty: boolean = false): ApplicationData {
    let current = localStorage.getItem(this.DATA_KEY);
    if (!current || current === 'undefined') {
      return new ApplicationData();
    }

    let result = JSON.parse(current);
    return result;
  }
}
