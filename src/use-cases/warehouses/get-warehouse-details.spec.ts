import { InMemoryWarehousesRepository } from 'test/in-memory/in-memory-warehouses-repository'
import { GetWarehouseDetailsUseCase } from './get-warehouse-details'
import { makeWarehouse } from 'test/factories/make-warehouse'

let inMemoryWarehousesRepository: InMemoryWarehousesRepository

let sut: GetWarehouseDetailsUseCase

describe('Get warehouse details', () => {
  beforeEach(() => {
    inMemoryWarehousesRepository = new InMemoryWarehousesRepository()

    sut = new GetWarehouseDetailsUseCase(inMemoryWarehousesRepository)
  })

  it('should be able to get warehouse details', async () => {
    const warehouseFactory = makeWarehouse()
    const warehouse =
      await inMemoryWarehousesRepository.create(warehouseFactory)

    const result = await sut.execute({
      id: warehouse.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(result.value).toEqual({
      warehouse: expect.objectContaining({
        id: warehouse.id,
        name: warehouse.name,
        description: warehouse.description,
        createdBy: warehouse.createdBy,
        createdAt: warehouse.createdAt,
        updatedAt: warehouse.updatedAt,
      }),
    })
  })
})
