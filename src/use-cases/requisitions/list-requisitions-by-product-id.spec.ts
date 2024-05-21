import { InMemoryCostCentersRepository } from 'test/in-memory/in-memory-cost-centers-repository'
import { InMemoryProductMovementRepository } from 'test/in-memory/in-memory-product-movement-repository'
import { InMemoryProductsRepository } from 'test/in-memory/in-memory-products-repository'
import { InMemoryRequisitionsRepository } from 'test/in-memory/in-memory-requisitions-repository'
import { InMemoryUsersRepository } from 'test/in-memory/in-memory-users-repository'
import { makeCostCenter } from 'test/factories/make-cost-center'
import { makeProduct } from 'test/factories/make-product'
import { makeUser } from 'test/factories/make-user'
import { makeProductMovement } from 'test/factories/make-product-movement'
import { ListRequisitionsByProductIdUseCase } from './list-requisitions-by-product-id'
import { makeRequisition } from 'test/factories/make-requisition'

let inMemoryRequisitionsRepository: InMemoryRequisitionsRepository
let inMemoryCostcentersRepository: InMemoryCostCentersRepository
let inMemoryProductsRepository: InMemoryProductsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryProductMovementRepository: InMemoryProductMovementRepository

let sut: ListRequisitionsByProductIdUseCase

describe('List requisition by product ID', () => {
  beforeEach(() => {
    inMemoryRequisitionsRepository = new InMemoryRequisitionsRepository()
    inMemoryCostcentersRepository = new InMemoryCostCentersRepository()
    inMemoryProductsRepository = new InMemoryProductsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryProductMovementRepository = new InMemoryProductMovementRepository()

    sut = new ListRequisitionsByProductIdUseCase(
      inMemoryRequisitionsRepository,
      inMemoryProductsRepository,
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

    const requisitionFactory = makeRequisition({
      costCenterId: costCenter.id,
      productId: product.id,
      quantity: 20,
      createdBy: user.id,
    })
    await inMemoryRequisitionsRepository.create(requisitionFactory)

    const result = await sut.execute({
      productId: product.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(result.value).toEqual({
      requisitions: expect.arrayContaining([
        expect.objectContaining({
          costCenterId: costCenter.id,
          productId: product.id,
          quantity: 20,
          createdBy: user.id,
        }),
      ]),
    })
  })
})
