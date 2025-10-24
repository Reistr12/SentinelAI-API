
import { ServerEntity } from '../entities/server.entity';


export interface IServerRepository {
  /**
   * Cria um novo usuário no banco.
   * Retorna o usuário criado com ID.
   */
  create(server: ServerEntity): Promise<ServerEntity | null>;

  /**
   * Busca todos os servers com filtro opcional (ex: por role ou nome).
   */
  findAll(filter?: { name?: string }): Promise<ServerEntity[]>;

  /**
   * Busca um server pelo ID.
   */
  findById(id: string): Promise<ServerEntity | null>;

  /**
   * Busca um usuário pelo email (usado em login).
   */
  findByIp(ip: string): Promise<ServerEntity | null>;

  /**
   * Atualiza um usuário existente.
   */
  update(id: string, data: Partial<ServerEntity>): Promise<ServerEntity | null>;

  /**
   * Deleta (ou desativa) um usuário pelo ID.
   */
  delete(id: string): Promise<void>;

  /**
   * Verifica se já existe um usuário com o email informado.
   * (útil para validação antes de criar novo usuário)
   */
  existsByIp(ip: string): Promise<boolean>;
}
