import { PrismaWarehousesRepository } from '@/repositories/prisma/prisma-warehouses-repository'
import { CreateWarehouseUseCase } from '../create-warehouse'

export function makeCreateWarehouseUseCase() {
  const warehousesRepository = new PrismaWarehousesRepository()
  const createWarehouseUseCase = new CreateWarehouseUseCase(
    warehousesRepository,
  )

  return createWarehouseUseCase
}
