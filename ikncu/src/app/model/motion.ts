import { Label } from './label';

export interface Motion {
  id: string;
  camera: string;
  occured: string;
  frame: string;
  labels: Label[];
}
