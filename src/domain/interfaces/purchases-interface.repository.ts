
import { PurchasesEntity } from '../entities/purchases.entity';


export interface IPurchasesRepository {
  /**
   * Cria um novo usuário no banco.
   * Retorna o usuário criado com ID.
   */
  create(server: PurchasesEntity): Promise<PurchasesEntity | null>;

  /**
   * Busca todos os servers com filtro opcional (ex: por role ou nome).
   */
  findAll(filter?: { name?: string }): Promise<PurchasesEntity[]>;

  /**
   * Busca uma compra pelo ID.
   */
  findByPurchaseId(id: string): Promise<PurchasesEntity | null>;

  /**
   * Atualiza um usuário existente.
   */
  update(id: string, data: Partial<PurchasesEntity>): Promise<PurchasesEntity | null>;

  /**
   * Deleta (ou desativa) um usuário pelo ID.
   */
  delete(id: string): Promise<void>;

  /**
   * Verifica se já existe um usuário com o email informado.
   * (útil para validação antes de criar novo usuário)
   */
  existsById(id: string): Promise<boolean>;
}
