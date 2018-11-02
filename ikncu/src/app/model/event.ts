import { KeyValue } from '@angular/common';

export interface IEvent {
  userid: string;
  cameraid: string;
  happened: number;
  frame: string;
  labels: KeyValue<string , number>[];
}
