
/**
 * Entidade de domínio representando um usuário do sistema.
 * Esta classe não depende de frameworks nem de ORM.
 * 
 * Ela define as regras e dados essenciais do usuário.
 */ 
export class PurchasesEntity {
  id?: string;
  name: string;
  plan: string;
  status: string;
  amount: string;
  payment: string;
  paid_at?: Date | null;
  refunded_at?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: Omit<PurchasesEntity, 'id' | 'createdAt' | 'updatedAt'>, id?: string) {
    Object.assign(this, props);
    if (id) this.id = id;
  }
}
