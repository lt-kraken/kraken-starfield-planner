import { Injectable } from '@angular/core';
import {Structure} from "../models/v1/structure";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  private endpoint: string = 'https://starfield-planner-api.krakensoftware.eu/v1/structure'

  constructor(private http: HttpClient) { }

  public getStructures(): Observable<Structure[]> {
    return this.http.get<Structure[]>(this.endpoint);
  }
}
