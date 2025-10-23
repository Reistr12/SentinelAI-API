import { Role } from 'src/infra/database/models/user.model';
import { UserEntity } from '../entities/user.entity';


export interface IUserRepository {
  /**
   * Cria um novo usuário no banco.
   * Retorna o usuário criado com ID.
   */
  create(user: UserEntity): Promise<UserEntity | null>;

  /**
   * Busca todos os usuários com filtro opcional (ex: por role ou nome).
   */
  findAll(filter?: { role?: Role; name?: string }): Promise<UserEntity[]>;

  /**
   * Busca um usuário pelo ID.
   */
  findById(id: string): Promise<UserEntity | null>;

  /**
   * Busca um usuário pelo email (usado em login).
   */
  findByEmail(email: string): Promise<UserEntity | null>;

  /**
   * Atualiza um usuário existente.
   */
  update(id: string, data: Partial<UserEntity>): Promise<UserEntity | null>;

  /**
   * Deleta (ou desativa) um usuário pelo ID.
   */
  delete(id: string): Promise<void>;

  /**
   * Verifica se já existe um usuário com o email informado.
   * (útil para validação antes de criar novo usuário)
   */
  existsByEmail(email: string): Promise<boolean>;
}
