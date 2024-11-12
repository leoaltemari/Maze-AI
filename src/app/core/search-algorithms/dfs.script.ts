import { MapMatrix, Position } from '@models';

import { SearchAlgorithmBase } from './search-algorithms-base';

export class DFS extends SearchAlgorithmBase {
  constructor(map: MapMatrix, sourcePos: Position) {
    super(map, sourcePos);
  }

  override run(): void {
    /** Stack for cells to be visited in DFS order */
    const stack: Position[] = [this._sourcePos];

    /** Cells that have already been visited */
    const visited: Set<string> = new Set();

    while (stack.length) {
      const { x, y } = stack.pop()!;
      this._expandedCells.push({ x, y });

      /** Target was found */
      if (this.isTarget({ x, y })) {
        this._path = this._expandedCells;
        return;
      }

      visited.add(`${x},${y}`);

      /** Iterate over neighbors in all possible directions */
      for (let [dx, dy] of this._directions) {
        const neighbor: Position = { x: x + dx, y: y + dy };

        /** Check if the neighbor can be accessed and hasn’t been visited */
        if (this.canAccessCell(neighbor) && !visited.has(`${neighbor.x},${neighbor.y}`)) {
          stack.push(neighbor);
        }
      }
    }
  }
}
