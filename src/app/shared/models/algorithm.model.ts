import { Position } from '@models';
import { AStar, DFS } from '@search-algorithms';

export type SearchAlgorithm = AStar | DFS;

export enum Algorithms {
  Astar = 'A*',
  BFS = 'BFS',
  DFS = 'DFS',
  BestFS = 'BestFS',
  HillClimb = 'HillClimb',
}

export type Heuristic = (a: Position, b: Position) => number;
