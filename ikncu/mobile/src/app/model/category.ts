import { IBox } from './face';

export interface ICategory {
  Id: string;
  Name: string;
}

export interface IFaceCategorized {
  Id: string;
  CategoryId: string;
  Name: string;
  Box: IBox;
}

export const CategoryList = [
  { Id: '0', Name: 'Stranger' },
  { Id: '1', Name: 'Family' },
  { Id: '2', Name: 'Friends' },
  { Id: '3', Name: 'Neighbours' },
  { Id: '4', Name: 'Services' },
  { Id: '5', Name: 'Dangerous' }
] as ICategory[];
