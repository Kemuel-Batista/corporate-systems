import { InMemoryWarehousesRepository } from 'test/in-memory/in-memory-warehouses-repository'
import { ListWarehousesUseCase } from './list-warehouse'
import { makeWarehouse } from 'test/factories/make-warehouse'

let inMemoryWarehousesRepository: InMemoryWarehousesRepository

let sut: ListWarehousesUseCase

describe('List Warehouses', () => {
  beforeEach(() => {
    inMemoryWarehousesRepository = new InMemoryWarehousesRepository()

    sut = new ListWarehousesUseCase(inMemoryWarehousesRepository)
  })

  it('should list all warehouses', async () => {
    const warehouse1Factory = makeWarehouse()
    const warehouse1 =
      await inMemoryWarehousesRepository.create(warehouse1Factory)

    const warehouse2Factory = makeWarehouse()
    const warehouse2 =
      await inMemoryWarehousesRepository.create(warehouse2Factory)

    const result = await sut.execute()

    expect(result.isSuccess()).toBe(true)

    expect(result.value).toMatchObject({
      warehouses: expect.arrayContaining([
        expect.objectContaining(warehouse1),
        expect.objectContaining(warehouse2),
      ]),
    })
  })
})
