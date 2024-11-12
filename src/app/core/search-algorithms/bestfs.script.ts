import { Cell, MapMatrix, Position } from '@models';
import { equalPositions, manhattanDistance } from '@utils';

import { SearchAlgorithmBase } from './search-algorithms-base';

export class BestFS extends SearchAlgorithmBase {
  constructor(
    map: MapMatrix,
    sourcePos: Position,
    targetPos: Position,
    heuristic = manhattanDistance,
  ) {
    super(map, sourcePos, targetPos, heuristic);
  }

  override run(): void {
    /** Priority queue for cells to be visited, sorted by heuristic only */
    const openSet: Cell[] = [new Cell(this._sourcePos)];

    /** Cells that have already been visited */
    const visited: Set<string> = new Set();

    while (openSet.length) {
      /** Sort openSet by heuristic (distance to target) only */
      openSet.sort((a, b) => a.distanceToTarget - b.distanceToTarget);
      const current = openSet.shift()!;

      this._expandedCells.push(current.position);

      /** Target was found */
      if (equalPositions(current.position, this._targetPos)) {
        this._path = this.backtrackingPath(current);
        return;
      }

      visited.add(`${current.position.x},${current.position.y}`);

      /** Iterate over neighbors in all possible directions */
      for (let [dx, dy] of this._directions) {
        const neighborPos: Position = {
          x: current.position.x + dx,
          y: current.position.y + dy,
        };

        /** Check if the neighbor can be accessed and hasn’t been visited */
        if (this.canAccessCell(neighborPos) && !visited.has(`${neighborPos.x},${neighborPos.y}`)) {
          const heuristicCost = this._heuristic(neighborPos, this._targetPos as Position);
          const neighbor = new Cell(neighborPos, current, 0, heuristicCost);

          openSet.push(neighbor);
          visited.add(`${neighborPos.x},${neighborPos.y}`);
        }
      }
    }
  }
}
