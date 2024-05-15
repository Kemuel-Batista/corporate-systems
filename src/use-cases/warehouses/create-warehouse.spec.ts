import { InMemoryWarehousesRepository } from 'test/in-memory/in-memory-warehouses-repository'
import { CreateWarehouseUseCase } from './create-warehouse'
import { randomUUID } from 'node:crypto'
import { describe, beforeEach, it, expect } from 'vitest'
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error'
import { WarehouseStatus } from '@/enums/warehouse'

let inMemoryWarehousesRepository: InMemoryWarehousesRepository

let sut: CreateWarehouseUseCase

describe('Create Warehouse', () => {
  beforeEach(() => {
    inMemoryWarehousesRepository = new InMemoryWarehousesRepository()

    sut = new CreateWarehouseUseCase(inMemoryWarehousesRepository)
  })

  it('should be able to create warehouse', async () => {
    const result = await sut.execute({
      name: 'Warehouse 01',
      description: 'Description 01',
      status: WarehouseStatus.ACTIVE,
      createdBy: randomUUID(),
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

  it('should not be able to create warehouse if it already exists', async () => {
    await sut.execute({
      name: 'Warehouse 01',
      description: 'Description 01',
      status: WarehouseStatus.ACTIVE,
      createdBy: randomUUID(),
    })

    const result = await sut.execute({
      name: 'Warehouse 01',
      description: 'Description 01',
      status: WarehouseStatus.ACTIVE,
      createdBy: randomUUID(),
    })

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
