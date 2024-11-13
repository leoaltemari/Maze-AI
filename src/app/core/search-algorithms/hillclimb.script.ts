import { Cell, MazeMatrix, Position } from '@models';
import { equalPositions, manhattanDistance } from '@utils';

import { SearchAlgorithmBase } from './search-algorithms-base';

export class HillClimb extends SearchAlgorithmBase {
  constructor(
    maze: MazeMatrix,
    sourcePos: Position,
    targetPos: Position,
    heuristic = manhattanDistance,
  ) {
    super(maze, sourcePos, targetPos, heuristic);
  }

  override run(): void {
    /** Initialize the current cell as the source cell */
    let current = new Cell(
      this._sourcePos,
      null,
      0,
      this._heuristic(this._sourcePos, this._targetPos!),
    );

    /** Keep track of visited cells to prevent revisiting */
    const visited: Set<string> = new Set();

    while (true) {
      this._expandedCells.push(current.position);

      /** Target was found */
      if (equalPositions(current.position, this._targetPos)) {
        this._path = this.backtrackingPath(current);
        return;
      }

      visited.add(`${current.position.x},${current.position.y}`);

      /** Find the best neighbor based on the heuristic */
      let bestNeighbor: Cell | null = null;
      let bestHeuristic = Infinity;

      for (let [dx, dy] of this._directions) {
        const neighborPos: Position = {
          x: current.position.x + dx,
          y: current.position.y + dy,
        };

        /** Check if the neighbor can be accessed and hasn’t been visited */
        if (this.canAccessCell(neighborPos) && !visited.has(`${neighborPos.x},${neighborPos.y}`)) {
          const heuristicCost = this._heuristic(neighborPos, this._targetPos!);

          /** Update the best neighbor if this one has a lower heuristic cost */
          if (heuristicCost < bestHeuristic) {
            bestHeuristic = heuristicCost;
            bestNeighbor = new Cell(neighborPos, current, 0, heuristicCost);
          }
        }
      }

      /** If no better neighbor is found, it’s a dead end (local minimum) */
      if (!bestNeighbor || bestHeuristic >= current.distanceToTarget) {
        this._path = this.backtrackingPath(bestNeighbor!);

        console.log('Reached a local minimum or dead end');
        return;
      }

      /** Move to the best neighbor */
      current = bestNeighbor;
    }
  }
}
