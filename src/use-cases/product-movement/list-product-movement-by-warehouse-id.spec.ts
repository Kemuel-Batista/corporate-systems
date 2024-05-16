import { InMemoryProductMovementRepository } from 'test/in-memory/in-memory-product-movement-repository'
import { InMemoryProductsRepository } from 'test/in-memory/in-memory-products-repository'
import { InMemoryWarehousesRepository } from 'test/in-memory/in-memory-warehouses-repository'
import { ListProductMovementByWarehouseIdUseCase } from './list-product-movement-by-warehouse-id'
import { makeProduct } from 'test/factories/make-product'
import { makeWarehouse } from 'test/factories/make-warehouse'
import { makeProductMovement } from 'test/factories/make-product-movement'

let inMemoryProductMovementRepository: InMemoryProductMovementRepository
let inMemoryProductsRepository: InMemoryProductsRepository
let inMemoryWarehousesRepository: InMemoryWarehousesRepository

let sut: ListProductMovementByWarehouseIdUseCase

describe('List Product Movement by WarehouseId', () => {
  beforeEach(() => {
    inMemoryProductMovementRepository = new InMemoryProductMovementRepository()
    inMemoryProductsRepository = new InMemoryProductsRepository()
    inMemoryWarehousesRepository = new InMemoryWarehousesRepository()

    sut = new ListProductMovementByWarehouseIdUseCase(
      inMemoryProductMovementRepository,
      inMemoryWarehousesRepository,
    )
  })

  it('should be able to fetch list of product movements by warehouse id', async () => {
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
      warehouseId: warehouse.id,
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
