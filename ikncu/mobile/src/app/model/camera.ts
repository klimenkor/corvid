export interface ICamera {
  Id: string;
  UserId: string;
  Name: string;
  Active: string;
}

export interface ICamerasResult {
    Items: [ICamera];
}

export interface ICameraResult {
    Item: ICamera;
}
