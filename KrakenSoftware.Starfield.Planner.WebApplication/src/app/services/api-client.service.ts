import { Injectable } from '@angular/core';
import {Structure} from "../models/v1/structure";
import {BehaviorSubject, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  private endpoint: string = 'https://starfield-planner-api.krakensoftware.eu/v1/structure'
  private service_status: string = 'https://starfield-planner-api.krakensoftware.eu/api/v1/monitor/services'
  private backendAvailableSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) { }

  public getStructures(): Observable<Structure[]> {
    return this.http.get<Structure[]>(this.endpoint);
  }

  public checkBackendAvailability(): void {
    this.http.get(this.service_status).pipe(
      map(() => true),
      catchError(() => of(false))
    ).subscribe((isAvailable: boolean) => {
      this.backendAvailableSubject.next(isAvailable);
    });
  }

  public getBackendStatus(): Observable<boolean> {
    return this.backendAvailableSubject.asObservable();
  }
}
