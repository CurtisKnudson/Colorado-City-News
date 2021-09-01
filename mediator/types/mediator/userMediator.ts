export interface IUserMediator {
  getUserByEmail(email: string): Promise<string>;
}
