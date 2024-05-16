import { Either, failure, success } from '@/core/either'
import { ProductMovementRepository } from '@/repositories/product-movement-repository'
import { ProductMovement } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { WarehousesRepository } from '@/repositories/warehouses-repository'

interface ListProductMovementByWarehouseIdUseCaseRequest {
  warehouseId: string
}

type ListProductMovementByWarehouseIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    productMovement: ProductMovement[]
  }
>

export class ListProductMovementByWarehouseIdUseCase {
  constructor(
    private productMovementRepository: ProductMovementRepository,
    private warehousesRepository: WarehousesRepository,
  ) {}

  async execute({
    warehouseId,
  }: ListProductMovementByWarehouseIdUseCaseRequest): Promise<ListProductMovementByWarehouseIdUseCaseResponse> {
    const warehouse = await this.warehousesRepository.findById(warehouseId)

    if (!warehouse) {
      return failure(new ResourceNotFoundError())
    }

    const productMovement =
      await this.productMovementRepository.listByWarehouseId(warehouseId)

    return success({
      productMovement,
    })
  }
}
