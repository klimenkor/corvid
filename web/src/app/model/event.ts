export interface IEvent {
  userid: string;
  cameraid: string;
  happened: number;
  frame: string;
  labels: ILabel[];
}

export interface ILabel {
  name: string;
  confidence: number;
}
