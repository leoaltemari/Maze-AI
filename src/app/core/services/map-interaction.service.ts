import { Injectable, Signal, signal } from '@angular/core';

import { Algorithms, TurnCellInto } from '@models';

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

  private readonly _selectedAlgorithm = signal<Algorithms>(Algorithms.Astar);
  get selectedAlgorithmAsSignal(): Signal<Algorithms> {
    return this._selectedAlgorithm.asReadonly();
  }
  get selectedAlgorithm(): Algorithms {
    return this._selectedAlgorithm();
  }
  set selectedAlgorithm(algorithm: Algorithms) {
    this._selectedAlgorithm.set(algorithm);
  }
}
