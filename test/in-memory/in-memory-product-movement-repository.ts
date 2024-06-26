import { MovementType } from '@/enums/product-movement'
import { ProductMovementRepository } from '@/repositories/product-movement-repository'
import { Prisma, ProductMovement } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryProductMovementRepository
  implements ProductMovementRepository
{
  public items: ProductMovement[] = []

  async create(
    data: Prisma.ProductMovementUncheckedCreateInput,
  ): Promise<ProductMovement> {
    const product = {
      id: randomUUID(),
      productId: data.productId,
      warehouseId: data.warehouseId,
      movementType: data.movementType,
      quantity: data.quantity,
      value: data.value,
      createdAt: new Date(),
    }

    this.items.push(product)

    return product
  }

  async listByProductId(productId: string): Promise<ProductMovement[]> {
    const productMovement = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .filter((item) => item.productId === productId)

    return productMovement
  }

  async listByWarehouseId(warehouseId: string): Promise<ProductMovement[]> {
    const productMovement = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .filter((item) => item.warehouseId === warehouseId)

    return productMovement
  }

  async listByDate(
    initialDate: Date,
    finalDate: Date,
  ): Promise<ProductMovement[]> {
    const productMovement = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .filter(
        (item) =>
          item.createdAt.getTime() >= initialDate.getTime() &&
          item.createdAt.getTime() <= finalDate.getTime(),
      )

    return productMovement
  }

  async quantityByProductId(productId: string): Promise<number> {
    const entryProductsQtd = this.items
      .filter(
        (item) =>
          item.productId === productId &&
          item.movementType >= MovementType.ENTRY_BY_PURCHASE &&
          item.movementType < MovementType.EXIT_BY_SALE,
      )
      .map((item) => item.quantity)
      .reduce((total, quantity) => total + quantity, 0)

    const exitProductsQtd = this.items
      .filter(
        (item) =>
          item.productId === productId &&
          item.movementType >= MovementType.EXIT_BY_SALE,
      )
      .map((item) => item.quantity)
      .reduce((total, quantity) => total + quantity, 0)

    const quantityByProduct = entryProductsQtd - exitProductsQtd

    return quantityByProduct
  }
}
