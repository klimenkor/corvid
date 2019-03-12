export interface ITier {
  id: string;
  name: string;
  mothlyPrice: number;
  annualPrice: number;
  processImage: boolean;
  processVideo: boolean;
  processFace: boolean;
}
