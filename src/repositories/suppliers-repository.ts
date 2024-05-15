import { Prisma, Supplier } from '@prisma/client'

export interface SuppliersRepository {
  create(data: Prisma.SupplierUncheckedCreateInput): Promise<Supplier>
  update(data: Supplier): Promise<Supplier>
  findById(id: string): Promise<Supplier | null>
  findByName(name: string): Promise<Supplier | null>
  list(): Promise<Supplier[]>
  delete(id: string): Promise<void>
}
