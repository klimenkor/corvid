import { int } from 'aws-sdk/clients/datapipeline';

export interface Label {
  name: string;
  confidence: number;
}

export interface Motion {
  id: string;
  cameraId: string;
  occurred: int;
  frame: string;
  labels: Label[];
}
