import { Position } from '@models';

export const equalPositions = (
  pos1: Position | undefined,
  pos2: Position | undefined,
) => {
  if (!pos1 || !pos2) {
    return false;
  }

  return pos1.x === pos2.x && pos1.y === pos2.y;
};
