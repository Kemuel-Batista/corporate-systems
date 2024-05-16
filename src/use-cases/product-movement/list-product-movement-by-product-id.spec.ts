import { InMemoryProductMovementRepository } from 'test/in-memory/in-memory-product-movement-repository'
import { InMemoryProductsRepository } from 'test/in-memory/in-memory-products-repository'
import { InMemoryWarehousesRepository } from 'test/in-memory/in-memory-warehouses-repository'
import { ListProductMovementByProductIdUseCase } from './list-product-movement-by-product-id'
import { makeProduct } from 'test/factories/make-product'
import { makeWarehouse } from 'test/factories/make-warehouse'
import { makeProductMovement } from 'test/factories/make-product-movement'

let inMemoryProductMovementRepository: InMemoryProductMovementRepository
let inMemoryProductsRepository: InMemoryProductsRepository
let inMemoryWarehousesRepository: InMemoryWarehousesRepository

let sut: ListProductMovementByProductIdUseCase

describe('List Product Movement by ProductId', () => {
  beforeEach(() => {
    inMemoryProductMovementRepository = new InMemoryProductMovementRepository()
    inMemoryProductsRepository = new InMemoryProductsRepository()
    inMemoryWarehousesRepository = new InMemoryWarehousesRepository()

    sut = new ListProductMovementByProductIdUseCase(
      inMemoryProductMovementRepository,
      inMemoryProductsRepository,
    )
  })

  it('should be able to fetch list of product movements by product id', async () => {
    const product = makeProduct()
    inMemoryProductsRepository.items.push(product)

    const warehouse = makeWarehouse()
    inMemoryWarehousesRepository.items.push(warehouse)

    const productMovement01 = makeProductMovement({
      productId: product.id,
      warehouseId: warehouse.id,
    })
    const productMovement02 = makeProductMovement({
      productId: product.id,
      warehouseId: warehouse.id,
    })
    inMemoryProductMovementRepository.items.push(
      productMovement01,
      productMovement02,
    )

    const result = await sut.execute({
      productId: product.id,
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
