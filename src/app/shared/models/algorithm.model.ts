import { Position } from '@models';
import { AStar, BestFS, BFS, DFS, HillClimb } from '@search-algorithms';

export type SearchAlgorithm = AStar | DFS | BFS | BestFS | HillClimb;

export enum Algorithms {
  Astar = 'A*',
  BFS = 'BFS',
  DFS = 'DFS',
  BestFS = 'Best First Search',
  HillClimb = 'HillClimb',
}

export type Heuristic = (a: Position, b: Position) => number;
