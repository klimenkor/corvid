export interface ILabel {
  Name: string;
  Confidence: number;
}

export interface IBoxInput {
  Height?: number | null;
  Left?: number | null;
  Top?: number | null;
  Width?: number | null;
}

export interface IRange {
  High?: number | null;
  Low?: number | null;
}

export interface IFeature {
  Confidence?: number | null;
  Value?: boolean | null;
}

export interface IAttribute {
  Confidence?: number | null;
  Value?: string | null;
}

export interface IEmotion {
  Confidence?: number | null;
  Type?: string | null;
}

export interface IDetectedFace {
  Box?: IBoxInput | null;
  Age?: IRange | null;
  Beard?: IFeature | null;
  Confidence?: number | null;
  Emotions?: Array< IEmotion | null > | null;
  Eyeglasses?: IFeature | null;
  Eyesopen?: IFeature | null;
  Gender?: IAttribute | null;
  Mouthopen?: IFeature | null;
  Mustache?: IFeature | null;
  Smile?: IFeature | null;
  Sunglasses?: IFeature | null;
}

export interface IMotion {
  Id: string;
  CameraId: string;
  Occurred: number;
  Frame: string;
  Labels: ILabel[];
  Faces: IDetectedFace[];
}

export interface ILabelCloud {
  text: string;
  weight: number;
  link: string;
}

export interface IMotionView {
  Id: string;
  Camera: string;
  Occurred: string;
  Frame: string;
  Labels: ILabelCloud[];
  Faces: IDetectedFace[];
}

export interface IMotionResult {
  Item: IMotion;
}

export interface IMotionsResult {
    Items: [IMotion];
}
