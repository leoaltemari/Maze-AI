import { Position } from '@models';

export const equalPositions = (pos1: Position, pos2: Position) => {
  return pos1.x === pos2.x && pos1.y === pos2.y;
};
