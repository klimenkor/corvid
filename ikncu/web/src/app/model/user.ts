export interface IUser {
  Id: string;
  TierId: string;
  Name: string;
  Email: string;
  UtcOffset: string;
  Labels?: Array< string | null > | null;
  Created: Date;
}

export interface IUserResult {
  Item: IUser;
}

export interface ICreateUserResult {
    Item: IUser;
}
