import { PrismaWarehousesRepository } from '@/repositories/prisma/prisma-warehouses-repository'
import { DeleteWarehouseUseCase } from '../delete-warehouse'

export function makeDeleteWarehouseUseCase() {
  const warehousesRepository = new PrismaWarehousesRepository()
  const deleteWarehouseUseCase = new DeleteWarehouseUseCase(
    warehousesRepository,
  )

  return deleteWarehouseUseCase
}
