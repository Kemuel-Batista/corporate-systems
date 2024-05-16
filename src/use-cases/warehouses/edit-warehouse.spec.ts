import { InMemoryWarehousesRepository } from 'test/in-memory/in-memory-warehouses-repository'
import { EditWarehouseUseCase } from './edit-warehouse'
import { randomUUID } from 'node:crypto'
import { describe, beforeEach, it, expect } from 'vitest'
import { ResourceAlreadyExistsError } from '../../core/errors/resource-already-exists-error'
import { makeWarehouse } from 'test/factories/make-warehouse'
import { WarehouseStatus } from '@/enums/warehouse'

let inMemoryWarehousesRepository: InMemoryWarehousesRepository

let sut: EditWarehouseUseCase

describe('Edit Warehouse', () => {
  beforeEach(() => {
    inMemoryWarehousesRepository = new InMemoryWarehousesRepository()

    sut = new EditWarehouseUseCase(inMemoryWarehousesRepository)
  })

  it('should be able to edit warehouse', async () => {
    const warehouseFactory = makeWarehouse()
    const warehouse =
      await inMemoryWarehousesRepository.create(warehouseFactory)

    const result = await sut.execute({
      id: warehouse.id,
      name: 'Warehouse 01',
      description: 'Description 01',
      status: WarehouseStatus.ACTIVE,
      updatedBy: randomUUID(),
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryWarehousesRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Warehouse 01',
          description: 'Description 01',
        }),
      ]),
    )
  })

  it('should not be able to edit warehouse if it already exists', async () => {
    const warehouseFactory = makeWarehouse({
      name: 'Warehouse 01',
    })
    await inMemoryWarehousesRepository.create(warehouseFactory)

    const warehouseFactory02 = makeWarehouse({})
    const warehouse02 =
      await inMemoryWarehousesRepository.create(warehouseFactory02)

    const result = await sut.execute({
      id: warehouse02.id,
      name: 'Warehouse 01',
      description: 'Description 01',
      status: WarehouseStatus.ACTIVE,
      updatedBy: randomUUID(),
    })

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
