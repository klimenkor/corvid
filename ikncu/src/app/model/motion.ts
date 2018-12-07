import { Label } from './label';

export interface Motion {
  id: string;
  camera: string;
  occurred: string;
  frame: string;
  labels: Label[];
}
