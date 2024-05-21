import { Prisma, ProductMovement } from '@prisma/client'
import { ProductMovementRepository } from '../product-movement-repository'
import { prisma } from '@/lib/prisma'

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
    const products = await prisma.productMovement.findMany({
      where: {
        productId,
      },
    })

    let quantityByProduct = 0

    for (const product of products) {
      quantityByProduct += product.quantity
    }

    return quantityByProduct
  }
}
