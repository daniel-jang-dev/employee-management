import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Position } from '@data/position';
import { POSITIONS } from '@data/mock-positions';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor() { }

  getPositions(): Observable<Position[]> {
    return of(POSITIONS);
  }
}
