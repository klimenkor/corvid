export interface ISettingDetection {
  userid: string;
  labels: ILabelSetting[];
}

export interface ILabelSetting {
  name: string;
  enable: boolean;
}
