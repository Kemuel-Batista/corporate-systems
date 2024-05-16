import { ProductsRepository } from '@/repositories/products-repository'
import { ProductMovement } from '@prisma/client'
import { Either, failure, success } from '@/core/either'
import { ProductMovementRepository } from '@/repositories/product-movement-repository'
import { WarehousesRepository } from '@/repositories/warehouses-repository'
import { ResourceNotFoundError } from '../../core/errors/resource-not-found-error'

interface CreateProductMovementUseCaseRequest {
  productId: string
  warehouseId: string
  movementType: number
  quantity: number
  value: number
}

type CreateProductMovementUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    productMovement: ProductMovement
  }
>

export class CreateProductMovementUseCase {
  constructor(
    private productMovementRepository: ProductMovementRepository,
    private productsRepository: ProductsRepository,
    private warehousesRepository: WarehousesRepository,
  ) {}

  async execute({
    productId,
    warehouseId,
    movementType,
    quantity,
    value,
  }: CreateProductMovementUseCaseRequest): Promise<CreateProductMovementUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      return failure(new ResourceNotFoundError())
    }

    const warehouse = await this.warehousesRepository.findById(warehouseId)

    if (!warehouse) {
      return failure(new ResourceNotFoundError())
    }

    const productMovement = await this.productMovementRepository.create({
      productId,
      warehouseId,
      movementType,
      quantity,
      value,
    })

    return success({
      productMovement,
    })
  }
}
