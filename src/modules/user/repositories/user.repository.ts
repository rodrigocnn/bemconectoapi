import { CreateUserDTO } from "../dtos/create-user.dto";
import { ResponseUserDTO } from "../dtos/response-user.dto";

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<ResponseUserDTO>;
  findByEmail(email: string): Promise<ResponseUserDTO | null>;
  read(): Promise<ResponseUserDTO[]>;
  show(id: string): Promise<ResponseUserDTO | null>;
  update(id: string, data: CreateUserDTO): Promise<ResponseUserDTO | null>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
