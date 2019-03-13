export interface ICamera {
  Id: string;
  UserId: string;
  Name: string;
  Active: boolean;
}

export interface ICamerasResult {
    Items: [ICamera];
}

export interface ICameraResult {
    Items: ICamera;
}
