import { Prisma, ProductMovement } from '@prisma/client'
import { ProductMovementRepository } from '../product-movement-repository'
import { prisma } from '@/lib/prisma'
import { MovementType } from '@/enums/product-movement'

export class PrismaProductMovementRepository
  implements ProductMovementRepository
{
  async create({
    productId,
    warehouseId,
    quantity,
    value,
    movementType,
  }: Prisma.ProductMovementUncheckedCreateInput): Promise<ProductMovement> {
    const productMovement = await prisma.productMovement.create({
      data: {
        productId,
        warehouseId,
        quantity,
        value,
        movementType,
      },
    })
    return productMovement
  }

  async listByProductId(productId: string): Promise<ProductMovement[]> {
    const productMovement = await prisma.productMovement.findMany({
      where: {
        productId,
      },
    })

    return productMovement
  }

  async listByWarehouseId(warehouseId: string): Promise<ProductMovement[]> {
    const productMovement = await prisma.productMovement.findMany({
      where: {
        warehouseId,
      },
    })

    return productMovement
  }

  async listByDate(
    initialDate: Date,
    finalDate: Date,
  ): Promise<ProductMovement[]> {
    const productMovement = await prisma.productMovement.findMany({
      where: {
        createdAt: {
          gte: initialDate,
          lte: finalDate,
        },
      },
    })

    return productMovement
  }

  async quantityByProductId(productId: string): Promise<number> {
    const entryProducts = await prisma.productMovement.findMany({
      where: {
        productId,
        movementType: {
          gte: MovementType.ENTRY_BY_PURCHASE,
          lt: MovementType.EXIT_BY_SALE,
        },
      },
    })

    const exitProducts = await prisma.productMovement.findMany({
      where: {
        productId,
        movementType: {
          gte: MovementType.EXIT_BY_SALE,
        },
      },
    })

    let entryProductsQtd = 0

    for (const product of entryProducts) {
      entryProductsQtd += product.quantity
    }

    let exitProductsQtd = 0

    for (const product of exitProducts) {
      exitProductsQtd += product.quantity
    }

    const quantityByProduct = entryProductsQtd - exitProductsQtd

    return quantityByProduct
  }
}
