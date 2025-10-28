import { LoginDataDefault } from "../dtos/response-login-user.dto";

export interface IAuthRepository {
  findByEmail(email: string): Promise<LoginDataDefault>;
}
