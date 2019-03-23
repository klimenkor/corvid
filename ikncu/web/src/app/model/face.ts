import { IBoxInput } from './motion';

export interface IFace {
  Id: string;
  UserId: string;
  CategoryId: string;
  Frame: string;
  Location: IBoxInput;
}

export interface IFacesResult {
    Items: [IFace];
}

export interface IFaceResult {
    Item: IFace;
}
