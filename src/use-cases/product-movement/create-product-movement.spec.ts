import { InMemoryProductMovementRepository } from 'test/in-memory/in-memory-product-movement-repository'
import { InMemoryProductsRepository } from 'test/in-memory/in-memory-products-repository'
import { InMemoryWarehousesRepository } from 'test/in-memory/in-memory-warehouses-repository'
import { CreateProductMovementUseCase } from './create-product-movement'
import { makeProduct } from 'test/factories/make-product'
import { makeWarehouse } from 'test/factories/make-warehouse'
import { MovementType } from '@/enums/product-movement'

let inMemoryProductMovementRepository: InMemoryProductMovementRepository
let inMemoryProductsRepository: InMemoryProductsRepository
let inMemoryWarehousesRepository: InMemoryWarehousesRepository

let sut: CreateProductMovementUseCase

describe('Create Product Movement', () => {
  beforeEach(() => {
    inMemoryProductMovementRepository = new InMemoryProductMovementRepository()
    inMemoryProductsRepository = new InMemoryProductsRepository()
    inMemoryWarehousesRepository = new InMemoryWarehousesRepository()

    sut = new CreateProductMovementUseCase(
      inMemoryProductMovementRepository,
      inMemoryProductsRepository,
      inMemoryWarehousesRepository,
    )
  })

  it('should be able to create a new product movement', async () => {
    const productFactory = makeProduct()
    const product = await inMemoryProductsRepository.create(productFactory)

    const warehouseFactory = makeWarehouse()
    const warehouse =
      await inMemoryWarehousesRepository.create(warehouseFactory)

    const result = await sut.execute({
      productId: product.id,
      warehouseId: warehouse.id,
      movementType: MovementType.ENTRY_BY_PURCHASE,
      quantity: 10,
      value: 100,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryProductMovementRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          productId: product.id,
          warehouseId: warehouse.id,
          movementType: MovementType.ENTRY_BY_PURCHASE,
          quantity: 10,
          value: 100,
        }),
      ]),
    )
  })
})
