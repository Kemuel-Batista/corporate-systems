import { PrismaPurchasesRepository } from '@/repositories/prisma/prisma-purchases-repository'
import { ConfirmPurchaseUseCase } from '../confirm-purchase'
import { PrismaProductMovementRepository } from '@/repositories/prisma/prisma-product-movement-repository'
import { PrismaWarehousesRepository } from '@/repositories/prisma/prisma-warehouses-repository'

export function makeConfirmPurchaseUseCase() {
  const purchasesRepository = new PrismaPurchasesRepository()
  const productMovementRepository = new PrismaProductMovementRepository()
  const warehousesRepository = new PrismaWarehousesRepository()

  const confirmPurchaseUseCase = new ConfirmPurchaseUseCase(
    purchasesRepository,
    productMovementRepository,
    warehousesRepository,
  )

  return confirmPurchaseUseCase
}
