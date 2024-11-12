import { Cell, MapMatrix, Position } from '@models';
import { equalPositions, manhattanDistance } from '@utils';

import { SearchAlgorithmBase } from './search-algorithms-base';

export class AStar extends SearchAlgorithmBase {
  constructor(
    map: MapMatrix,
    sourcePos: Position,
    targetPos: Position,
    heuristic = manhattanDistance,
  ) {
    super(map, sourcePos, targetPos, heuristic);
  }

  /**
   * Format the path backtracking the target cell to its parent, recursively,
   * until it finds the source cell (has no parent cell, parent === null)
   */
  private formatPath(target: Cell): Position[] {
    const path: Position[] = [];

    let temp: Cell | null = target;

    while (temp) {
      path.push({ x: temp.position.x, y: temp.position.y });
      temp = temp.parent;
    }

    return path.reverse();
  }

  override run(): void {
    const source = new Cell(this._sourcePos);
    const target = new Cell(this._targetPos as Position);

    source.distanceToTarget = this._heuristic(source.position, target.position);
    source.totalCost = source.distanceToTarget;

    /** Cells that can be visited */
    const openSet: Cell[] = [source];

    /** Cells that was already visited */
    const closedSet: Cell[] = [];

    /** Will try to find the path until there is no more cells to visit */
    while (openSet.length) {
      openSet.sort((a, b) => a.totalCost - b.totalCost);
      console.log(
        openSet.map((set) => ({
          x: set.position.x,
          y: set.position.y,
          fromSrc: set.costFromSource,
          toTg: set.distanceToTarget,
          cost: set.totalCost,
        })),
      );

      const current = openSet.shift()!;

      this._expandedCells.push(current.position);

      /** Target was found */
      if (equalPositions(current.position, target.position)) {
        this._path = this.formatPath(current);
        return;
      }

      closedSet.push(current);

      /** Finds the nearest neighbor from current cell that has the best score to the target */
      for (let [dx, dy] of this._directions) {
        const x = current.position.x + dx;
        const y = current.position.y + dy;

        if (this.canAccessCell({ x, y }, closedSet)) {
          const gScore = current.costFromSource + 1;
          let neighbor = openSet.find(({ position }) => equalPositions(position, { x, y }));

          /** New cell was found */
          if (!neighbor) {
            openSet.push(
              new Cell({ x, y }, gScore, this._heuristic({ x, y }, target.position), current),
            );
          } else if (gScore < neighbor.costFromSource) {
            /** Found a better path to a cell that was already visited */
            const { costFromSource, distanceToTarget } = neighbor;

            neighbor.costFromSource = gScore;
            neighbor.totalCost = costFromSource + distanceToTarget;
            neighbor.parent = current;
          }
        }
      }
    }
  }
}
