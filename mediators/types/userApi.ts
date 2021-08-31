export interface UserApi {
  getUserByEmail(email: string): Promise<string>;
}
