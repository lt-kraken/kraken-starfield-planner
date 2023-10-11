import { Injectable } from '@angular/core';
import {Structure} from "../models/v1/structure";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  private endpoint: string = ''

  constructor(private http: HttpClient) {

  }

  public getStructures(): Observable<Structure[]> {
    return of(this.getMockedResponse());
  }

  private getMockedResponse(): Structure[] {
    return [
      {
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
      {
        name: 'Scan Booster',
        category: 'miscellaneous',
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
        powerDemand: 3,
        powerProductionMin: undefined,
        powerProductionMax: undefined
      },
      {
        name: 'Compound Fabricator - Control Rod',
        category: 'builders',
        build_cost: [
          {
            name: 'Adhesive',
            amount: 4,
            weight: .1
          },
          {
            name: 'Isotopic Coolant',
            amount: 2,
            weight: .25
          },
          {
            name: 'Tungsten',
            amount: 8,
            weight: .14
          },
          {
            name: 'Zero Wire',
            amount: 5,
            weight: .1
          }
        ],
        powerDemand: 8,
        powerProductionMin: undefined,
        powerProductionMax: undefined
      },
      {
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
        ],
        powerDemand: 5,
        powerProductionMin: undefined,
        powerProductionMax: undefined
      }
    ];
  }
}
