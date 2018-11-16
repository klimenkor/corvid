export interface IUser {
  id: string;
  shortid: string;
  email: string;
  labels?: Array< string | null > | null;
  cameras?: Array< string | null > | null;
  tier: string;
}
