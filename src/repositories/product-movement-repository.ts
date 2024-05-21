import { Prisma, ProductMovement } from '@prisma/client'

export interface ProductMovementRepository {
  create(
    data: Prisma.ProductMovementUncheckedCreateInput,
  ): Promise<ProductMovement>
  listByProductId(productId: string): Promise<ProductMovement[]>
  listByWarehouseId(warehouseId: string): Promise<ProductMovement[]>
  listByDate(initialDate: Date, finalDate: Date): Promise<ProductMovement[]>
  quantityByProductId(productId: string): Promise<number>
}
