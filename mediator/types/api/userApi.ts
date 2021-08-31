export interface IUserApi {
  getUserByEmail(email: string): Promise<string>;
}
