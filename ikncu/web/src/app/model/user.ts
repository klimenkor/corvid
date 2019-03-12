export interface IUser {
  Id: string;
  TierId: string;
  Email: string;
  Name: string;
  Labels?: Array< string | null > | null;
  Created: Date;
}

export interface IUserResult {
  Item: IUser;
}
