export interface Label {
  Name: string;
  Confidence: number;
}

export interface IMotion {
  Id: string;
  CameraId: string;
  Occurred: number;
  Frame: string;
  Labels: Label[];
}

export interface IMotionResult {
  Item: IMotion;
}

export interface IMotionsResult {
    Items: [IMotion];
}
