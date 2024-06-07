import { Prisma, Client } from '@prisma/client'

export interface ClientsRepository {
  create(data: Prisma.ClientUncheckedCreateInput): Promise<Client>
  update(data: Client): Promise<Client>
  findById(id: string): Promise<Client | null>
  findByCpf(cpf: string): Promise<Client | null>
  list(): Promise<Client[]>
  delete(id: string): Promise<void>
}
