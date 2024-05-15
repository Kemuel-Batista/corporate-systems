import { Prisma, Warehouse } from '@prisma/client'

export interface WarehousesRepository {
  create(data: Prisma.WarehouseUncheckedCreateInput): Promise<Warehouse>
  update(data: Warehouse): Promise<Warehouse>
  findById(id: string): Promise<Warehouse | null>
  findByName(name: string): Promise<Warehouse | null>
  list(): Promise<Warehouse[]>
  delete(id: string): Promise<void>
}
