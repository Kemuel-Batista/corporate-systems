import { InMemoryCostCentersRepository } from 'test/in-memory/in-memory-cost-centers-repository'
import { InMemoryProductMovementRepository } from 'test/in-memory/in-memory-product-movement-repository'
import { InMemoryProductsRepository } from 'test/in-memory/in-memory-products-repository'
import { InMemoryRequisitionsRepository } from 'test/in-memory/in-memory-requisitions-repository'
import { InMemoryUsersRepository } from 'test/in-memory/in-memory-users-repository'
import { CreateRequisitionUseCase } from './create-requisition'
import { makeCostCenter } from 'test/factories/make-cost-center'
import { makeProduct } from 'test/factories/make-product'
import { makeUser } from 'test/factories/make-user'
import { makeProductMovement } from 'test/factories/make-product-movement'
import { MovementType } from '@/enums/product-movement'
import { QuantityRequestedDoesNotExistsError } from '@/core/errors/quantity-requested-does-not-exists-error'
import { InMemoryWarehousesRepository } from 'test/in-memory/in-memory-warehouses-repository'
import { makeWarehouse } from 'test/factories/make-warehouse'

let inMemoryRequisitionsRepository: InMemoryRequisitionsRepository
let inMemoryCostcentersRepository: InMemoryCostCentersRepository
let inMemoryProductsRepository: InMemoryProductsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryProductMovementRepository: InMemoryProductMovementRepository
let inMemoryWarehousesRepository: InMemoryWarehousesRepository

let sut: CreateRequisitionUseCase

describe('Create requisition', () => {
  beforeEach(() => {
    inMemoryRequisitionsRepository = new InMemoryRequisitionsRepository()
    inMemoryCostcentersRepository = new InMemoryCostCentersRepository()
    inMemoryProductsRepository = new InMemoryProductsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryProductMovementRepository = new InMemoryProductMovementRepository()
    inMemoryWarehousesRepository = new InMemoryWarehousesRepository()

    sut = new CreateRequisitionUseCase(
      inMemoryRequisitionsRepository,
      inMemoryCostcentersRepository,
      inMemoryProductsRepository,
      inMemoryUsersRepository,
      inMemoryProductMovementRepository,
      inMemoryWarehousesRepository,
    )
  })

  it('should be able to create a new requisition', async () => {
    const costCenterFactory = makeCostCenter()
    const costCenter =
      await inMemoryCostcentersRepository.create(costCenterFactory)

    const productFactory = makeProduct()
    const product = await inMemoryProductsRepository.create(productFactory)

    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const productMovementFactory = makeProductMovement({
      productId: product.id,
      quantity: 50,
    })
    await inMemoryProductMovementRepository.create(productMovementFactory)

    const warehouseFactory = makeWarehouse()
    const warehouse =
      await inMemoryWarehousesRepository.create(warehouseFactory)

    const result = await sut.execute({
      costCenterId: costCenter.id,
      productId: product.id,
      quantity: 20,
      requestedBy: user.id,
      warehouseId: warehouse.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryRequisitionsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          costCenterId: costCenter.id,
          productId: product.id,
          quantity: 20,
          createdBy: user.id,
        }),
      ]),
    )

    expect(inMemoryProductMovementRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          productId: product.id,
          movementType: MovementType.EXIT_BY_REQUISITION,
          quantity: 20,
          value: 0,
        }),
      ]),
    )
  })

  it('should not be able to create a new requisition if the requested quantity does not exists on warehouse', async () => {
    const costCenterFactory = makeCostCenter()
    const costCenter =
      await inMemoryCostcentersRepository.create(costCenterFactory)

    const warehouseFactory = makeWarehouse()
    const warehouse =
      await inMemoryWarehousesRepository.create(warehouseFactory)

    const productFactory = makeProduct()
    const product = await inMemoryProductsRepository.create(productFactory)

    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const productMovementFactory = makeProductMovement({
      productId: product.id,
      quantity: 10,
    })
    await inMemoryProductMovementRepository.create(productMovementFactory)

    const result = await sut.execute({
      costCenterId: costCenter.id,
      productId: product.id,
      quantity: 20,
      requestedBy: user.id,
      warehouseId: warehouse.id,
    })

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(QuantityRequestedDoesNotExistsError)
  })
})
