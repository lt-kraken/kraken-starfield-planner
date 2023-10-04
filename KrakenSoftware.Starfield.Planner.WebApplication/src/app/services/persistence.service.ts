import { Injectable } from '@angular/core';
import { Outpost } from '../models/Outpost';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  private OUTPOST_KEY: string = "local_outposts";

  constructor() { }

  public persistOutposts(outposts: Outpost[]): void {
    localStorage.setItem(this.OUTPOST_KEY, JSON.stringify(outposts));
  }

  public getOutposts(): Outpost[] {
    let current = localStorage.getItem(this.OUTPOST_KEY);
    if (!current) return [];
    return JSON.parse(current ?? '');
  }
}
