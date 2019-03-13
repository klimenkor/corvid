import { int } from 'aws-sdk/clients/datapipeline';

export interface Label {
  Name: string;
  Confidence: number;
}

export interface IMotion {
  Id: string;
  CameraId: string;
  Occurred: int;
  Frame: string;
  Labels: Label[];
}

export interface IMotionResult {
  Item: IMotion;
}

export interface IMotionsResult {
    Item: [IMotion];
}
