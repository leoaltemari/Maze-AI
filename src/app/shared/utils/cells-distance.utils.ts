import { Position } from '@models';

export const manhattanDistance = (positionA: Position, positionB: Position): number => {
  return Math.abs(positionA.x - positionB.x) + Math.abs(positionA.y - positionB.y);
};

export const euclideanDistance = (positionA: Position, positionB: Position): number => {
  const dx = positionB.x - positionA.x;
  const dy = positionB.x - positionA.y;

  return Math.sqrt(dx * dx + dy * dy);
};
