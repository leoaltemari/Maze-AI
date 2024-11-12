import { Cell, MapMatrix, Position } from '@models';

import { SearchAlgorithmBase } from './search-algorithms-base';

export class BFS extends SearchAlgorithmBase {
  constructor(map: MapMatrix, sourcePos: Position) {
    super(map, sourcePos);
  }

  override run(): void {
    /** Queue for cells to be visited in BFS order */
    const queue: Cell[] = [new Cell(this._sourcePos)];

    /** Cells that have already been visited */
    const visited: Set<string> = new Set();

    while (queue.length) {
      const current = queue.shift()!;
      this._expandedCells.push(current.position);

      /** Target was found */
      if (this.isTarget(current.position)) {
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
          const neighbor = new Cell(neighborPos, current);

          queue.push(neighbor);
          visited.add(`${neighborPos.x},${neighborPos.y}`);
        }
      }
    }
  }
}
