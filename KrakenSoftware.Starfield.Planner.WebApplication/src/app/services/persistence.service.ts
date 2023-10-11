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
    let result = JSON.parse(current ?? '');

    if (result.outposts.length === 0 && useMockIfEmpty) return this.getMockData();
    return result;
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
                name: 'Solar Array',
                category: 'power',
                build_cost: [
                  {
                    name: 'Aluminum',
                    amount: 4,
                    weight: .1
                  },
                  {
                    name: 'Beryllium',
                    amount: 2,
                    weight: .2
                  },
                  {
                    name: 'Copper',
                    amount: 3,
                    weight: .1
                  }
                ],
                powerDemand: undefined,
                powerProductionMin: 4,
                powerProductionMax: 6
              },
              amount_build: 4,
              amount_queued: -2
            },
            {
              structure: {
                name: 'Simple Fabricator - Adaptive Frame',
                category: 'builders',
                build_cost: [
                  {
                    name: 'Aluminum',
                    amount: 8,
                    weight: .1
                  },
                  {
                    name: 'Sealant',
                    amount: 2,
                    weight: .1
                  },
                  {
                    name: 'Tungsten',
                    amount: 4,
                    weight: .1
                  },
                  {
                    name: 'Zero Wire',
                    amount: 3,
                    weight: .1
                  }
              ]},
              amount_build: 2,
              amount_queued: 5
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
