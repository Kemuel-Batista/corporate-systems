import { PrismaWarehousesRepository } from '@/repositories/prisma/prisma-warehouses-repository'
import { ListWarehousesUseCase } from '../list-warehouse'

export function makeListWarehousesUseCase() {
  const warehousesRepository = new PrismaWarehousesRepository()
  const listWarehousesUseCase = new ListWarehousesUseCase(warehousesRepository)

  return listWarehousesUseCase
}
