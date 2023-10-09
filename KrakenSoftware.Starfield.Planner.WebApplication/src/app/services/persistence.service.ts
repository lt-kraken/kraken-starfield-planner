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

  public getApplicationData(): ApplicationData {
    return this.getMockData();


    let current = localStorage.getItem(this.DATA_KEY);
    if (!current) return new ApplicationData();
    return JSON.parse(current ?? '');
  }

  private getMockData(): ApplicationData {
    return {
      version: 'v1',
      outposts: [
        {
          name: 'Adaptive Frames 001',
          system: 'SOL',
          planet: 'Mars',
          moon: '',
          unsaved_structures: [
            {
              structure: {
                build_cost: [],
              },
              amount_build: 0,
              amount_queued: 0
            },
          ],
          structures: [
            {
              structure: {
                name: 'test',
                build_cost: [{ name:'iron', amount: 2, weight: .1 }],
                category: 'power',
                powerDemand: undefined,
                powerProductionMax: 4,
                powerProductionMin: 8
              },
              amount_build: 0,
              amount_queued: 0
            },
            {
              structure: {
                name: 'test',
                build_cost: [{ name:'iron', amount: 2, weight: .1 }],
                category: 'power',
                powerDemand: undefined,
                powerProductionMax: 4,
                powerProductionMin: 8
              },
              amount_build: 0,
              amount_queued: 0
            },
          ]
        },
        {
          name: 'Iron Mine 002',
          system: 'Alpha Centauri',
          planet: 'Jemison',
          moon: 'Taurus',
          structures: [],
          unsaved_structures: []
        },
        {
          name: 'Titanium & Cobalt Mine 003',
          system: 'Wolf',
          planet: 'Yzebyrreiunmi',
          moon: 'Yzebyrreiunmi III',
          structures: [],
          unsaved_structures: []
        }
      ],
      queue: []
    }
  }
}
