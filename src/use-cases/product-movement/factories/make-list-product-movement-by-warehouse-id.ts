import { PrismaProductMovementRepository } from '@/repositories/prisma/prisma-product-movement-repository'
import { PrismaWarehousesRepository } from '@/repositories/prisma/prisma-warehouses-repository'
import { ListProductMovementByWarehouseIdUseCase } from '../list-product-movement-by-warehouse-id'

export function makeListProductMovementByWarehouseIdUseCase() {
  const productMovementRepository = new PrismaProductMovementRepository()
  const warehousesRepository = new PrismaWarehousesRepository()

  const listProductMovementByWarehouseIdUseCase =
    new ListProductMovementByWarehouseIdUseCase(
      productMovementRepository,
      warehousesRepository,
    )

  return listProductMovementByWarehouseIdUseCase
}
