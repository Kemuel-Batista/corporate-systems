import { InMemoryWarehousesRepository } from 'test/in-memory/in-memory-warehouses-repository'
import { DeleteWarehouseUseCase } from './delete-warehouse'
import { makeWarehouse } from 'test/factories/make-warehouse'

let inMemoryWarehousesRepository: InMemoryWarehousesRepository

let sut: DeleteWarehouseUseCase

describe('Delete warehouse', () => {
  beforeEach(() => {
    inMemoryWarehousesRepository = new InMemoryWarehousesRepository()

    sut = new DeleteWarehouseUseCase(inMemoryWarehousesRepository)
  })

  it('should be able to delete warehouse', async () => {
    const warehouseFactory = makeWarehouse()
    const warehouse =
      await inMemoryWarehousesRepository.create(warehouseFactory)

    const result = await sut.execute({
      id: warehouse.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryWarehousesRepository.items).toHaveLength(0)
  })
})
