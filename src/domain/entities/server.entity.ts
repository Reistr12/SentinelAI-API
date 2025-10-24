
/**
 * Entidade de domínio representando um usuário do sistema.
 * Esta classe não depende de frameworks nem de ORM.
 * 
 * Ela define as regras e dados essenciais do usuário.
 */
export class ServerEntity {
  id?: string;
  ip: string;
  name: string;
  devices?: string[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: Omit<ServerEntity, 'id' | 'createdAt' | 'updatedAt'>, id?: string) {
    Object.assign(this, props);
    if (id) this.id = id;
  }
}
