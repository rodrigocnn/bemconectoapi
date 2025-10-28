import { hash } from "bcrypt";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { IUserRepository } from "../repositories/user.repository";
import { ResponseUserDTO } from "../dtos/response-user.dto";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  // Criar usuário com senha hash
  async create(data: CreateUserDTO): Promise<ResponseUserDTO> {
    const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);
    const hashedPassword = await hash(data.password, saltRounds);

    const userToCreate = {
      ...data,
      password: hashedPassword,
    };

    const user = await this.userRepository.create(userToCreate);
    return user;
  }

  // Listar todos os usuários
  async read(): Promise<ResponseUserDTO[]> {
    return this.userRepository.read();
  }

  // Buscar usuário por ID
  async show(id: string): Promise<ResponseUserDTO | null> {
    return this.userRepository.show(id);
  }

  // Atualizar usuário
  async update(
    id: string,
    data: CreateUserDTO
  ): Promise<ResponseUserDTO | null> {
    // Opcional: re-hash se a senha estiver sendo atualizada
    if (data.password) {
      const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);
      data.password = await hash(data.password, saltRounds);
    }
    return this.userRepository.update(id, data);
  }

  // Deletar usuário
  async delete(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }

  // Verificar se usuário existe
  async exists(id: string): Promise<boolean> {
    return this.userRepository.exists(id);
  }
}
