import { PrismaWarehousesRepository } from '@/repositories/prisma/prisma-warehouses-repository'
import { EditWarehouseUseCase } from '../edit-warehouse'

export function makeEditWarehouseUseCase() {
  const warehousesRepository = new PrismaWarehousesRepository()
  const editWarehouseUseCase = new EditWarehouseUseCase(warehousesRepository)

  return editWarehouseUseCase
}
