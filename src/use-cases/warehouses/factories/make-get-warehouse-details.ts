import { PrismaWarehousesRepository } from '@/repositories/prisma/prisma-warehouses-repository'
import { GetWarehouseDetailsUseCase } from '../get-warehouse-details'

export function makeGetWarehouseDetailsUseCase() {
  const warehousesRepository = new PrismaWarehousesRepository()
  const getWarehouseDetailsUseCase = new GetWarehouseDetailsUseCase(
    warehousesRepository,
  )

  return getWarehouseDetailsUseCase
}
