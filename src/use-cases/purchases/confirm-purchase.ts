import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { MovementType } from '@/enums/product-movement'
import { PurchaseStatus } from '@/enums/purchase'
import { ProductMovementRepository } from '@/repositories/product-movement-repository'
import { PurchasesRepository } from '@/repositories/purchases-repository'
import { WarehousesRepository } from '@/repositories/warehouses-repository'

interface ConfirmPurchaseUseCaseRequest {
  id: string
  warehouseId: string
}

type ConfirmPurchaseUseCaseResponse = Either<ResourceNotFoundError, null>

export class ConfirmPurchaseUseCase {
  constructor(
    private purchasesRepository: PurchasesRepository,
    private productMovementRepository: ProductMovementRepository,
    private warehousesRepository: WarehousesRepository,
  ) {}

  async execute({
    id,
    warehouseId,
  }: ConfirmPurchaseUseCaseRequest): Promise<ConfirmPurchaseUseCaseResponse> {
    const purchase = await this.purchasesRepository.findById(id)

    if (!purchase) {
      return failure(new ResourceNotFoundError())
    }

    const warehouse = await this.warehousesRepository.findById(warehouseId)

    if (!warehouse) {
      return failure(new ResourceNotFoundError())
    }

    await this.productMovementRepository.create({
      movementType: MovementType.ENTRY_BY_PURCHASE,
      productId: purchase.productId,
      warehouseId,
      quantity: purchase.quantity,
      value: purchase.unitCost,
      createdAt: new Date(),
    })

    purchase.status = PurchaseStatus.CLOSED

    await this.purchasesRepository.update(purchase)

    return success(null)
  }
}
