export interface IFace {
  Id: string;
  UserId: string;
  CategoryId: string;
  Name: string;
}

export interface IFacesResult {
    Items: [IFace];
}

export interface IFaceResult {
    Item: IFace;
}
