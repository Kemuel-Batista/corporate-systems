import { InMemoryProductMovementRepository } from 'test/in-memory/in-memory-product-movement-repository'
import { InMemoryProductsRepository } from 'test/in-memory/in-memory-products-repository'
import { InMemoryWarehousesRepository } from 'test/in-memory/in-memory-warehouses-repository'
import { makeProduct } from 'test/factories/make-product'
import { makeWarehouse } from 'test/factories/make-warehouse'
import { makeProductMovement } from 'test/factories/make-product-movement'
import { ListProductMovementByDateUseCase } from './list-product-movement-by-date'

let inMemoryProductMovementRepository: InMemoryProductMovementRepository
let inMemoryProductsRepository: InMemoryProductsRepository
let inMemoryWarehousesRepository: InMemoryWarehousesRepository

let sut: ListProductMovementByDateUseCase

describe('List Product Movement by date', () => {
  beforeEach(() => {
    inMemoryProductMovementRepository = new InMemoryProductMovementRepository()
    inMemoryProductsRepository = new InMemoryProductsRepository()
    inMemoryWarehousesRepository = new InMemoryWarehousesRepository()

    sut = new ListProductMovementByDateUseCase(
      inMemoryProductMovementRepository,
    )
  })

  it('should be able to fetch list of product movements by date', async () => {
    const now = new Date()

    const yesterday = new Date(now)
    yesterday.setDate(now.getDate() - 1)

    const tomorrow = new Date(now)
    tomorrow.setDate(now.getDate() + 1)

    const product = makeProduct()
    inMemoryProductsRepository.items.push(product)

    const warehouse = makeWarehouse()
    inMemoryWarehousesRepository.items.push(warehouse)

    const productMovement01 = makeProductMovement({
      productId: product.id,
      warehouseId: warehouse.id,
      createdAt: yesterday,
    })
    const productMovement02 = makeProductMovement({
      productId: product.id,
      warehouseId: warehouse.id,
      createdAt: yesterday,
    })
    inMemoryProductMovementRepository.items.push(
      productMovement01,
      productMovement02,
    )

    const result = await sut.execute({
      initialDate: yesterday,
      finalDate: tomorrow,
    })

    expect(result.isSuccess()).toBe(true)

    expect(result.value).toMatchObject({
      productMovement: expect.arrayContaining([
        expect.objectContaining(productMovement01),
        expect.objectContaining(productMovement02),
      ]),
    })
  })
})
