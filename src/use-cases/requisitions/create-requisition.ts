import { Either, failure, success } from '@/core/either'
import { QuantityRequestedDoesNotExistsError } from '@/core/errors/quantity-requested-does-not-exists-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { MovementType } from '@/enums/product-movement'
import { RequisitionStatus } from '@/enums/requisition'
import { CostCentersRepository } from '@/repositories/cost-centers-repository'
import { ProductMovementRepository } from '@/repositories/product-movement-repository'
import { ProductsRepository } from '@/repositories/products-repository'
import { RequisitionsRepository } from '@/repositories/requisitions-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { WarehousesRepository } from '@/repositories/warehouses-repository'
import { Requisition } from '@prisma/client'

interface CreateRequisitionUseCaseRequest {
  costCenterId: string
  productId: string
  quantity: number
  requestedBy: string
  warehouseId?: string
}

type CreateRequisitionUseCaseResponse = Either<
  ResourceNotFoundError | QuantityRequestedDoesNotExistsError,
  {
    requisition: Requisition
  }
>

export class CreateRequisitionUseCase {
  constructor(
    private requisitionsRepository: RequisitionsRepository,
    private costcentersRepository: CostCentersRepository,
    private productsRepository: ProductsRepository,
    private usersRepository: UsersRepository,
    private productMovementRepository: ProductMovementRepository,
    private warehousesRepository: WarehousesRepository,
  ) {}

  async execute({
    costCenterId,
    productId,
    quantity,
    requestedBy,
    warehouseId,
  }: CreateRequisitionUseCaseRequest): Promise<CreateRequisitionUseCaseResponse> {
    const costCenter = await this.costcentersRepository.findById(costCenterId)

    if (!costCenter) {
      return failure(new ResourceNotFoundError())
    }

    const product = await this.productsRepository.findById(productId)

    if (!product) {
      return failure(new ResourceNotFoundError())
    }

    const user = await this.usersRepository.findById(requestedBy)

    if (!user) {
      return failure(new ResourceNotFoundError())
    }

    const quantityByProduct =
      await this.productMovementRepository.quantityByProductId(productId)

    if (quantityByProduct < quantity) {
      return failure(new QuantityRequestedDoesNotExistsError())
    }

    const warehouse = await this.warehousesRepository.findById(warehouseId)

    if (!warehouse) {
      return failure(new ResourceNotFoundError())
    }

    // Processar requisição e produto ser atendido
    const requisition = await this.requisitionsRepository.create({
      costCenterId,
      productId,
      quantity,
      status: RequisitionStatus.CREATED,
      createdBy: requestedBy,
    })

    await this.productMovementRepository.create({
      movementType: MovementType.EXIT_BY_REQUISITION,
      productId,
      warehouseId: '', // TODO: para onde sair?
      quantity,
      value: 0,
      createdAt: new Date(),
    })

    return success({
      requisition,
    })
  }
}
