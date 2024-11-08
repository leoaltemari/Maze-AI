import { Injectable, signal } from '@angular/core';

import { TurnCellInto } from '@models';


@Injectable({
  providedIn: 'root',
})
export class MapInteractionService {
  private readonly _turnCellInto = signal<TurnCellInto>(TurnCellInto.Wall);
  get turnCellInto(): TurnCellInto {
    return this._turnCellInto();
  }
  set turnCellInto(action: TurnCellInto) {
    this._turnCellInto.set(action);
  }

  /** Algorithims selections will be placed here */
}
