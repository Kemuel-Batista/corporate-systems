import { InMemorySuppliersRepository } from 'test/in-memory/in-memory-suppliers-repository'
import { CreateSupplierUseCase } from './create-supplier'
import { randomUUID } from 'node:crypto'
import { describe, beforeEach, it, expect } from 'vitest'
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error'
import { SupplierStatus } from '@/enums/supplier'

let inMemorySuppliersRepository: InMemorySuppliersRepository

let sut: CreateSupplierUseCase

describe('Create Supplier', () => {
  beforeEach(() => {
    inMemorySuppliersRepository = new InMemorySuppliersRepository()

    sut = new CreateSupplierUseCase(inMemorySuppliersRepository)
  })

  it('should be able to create supplier', async () => {
    const result = await sut.execute({
      name: 'Supplier 01',
      description: 'Description 01',
      status: SupplierStatus.ACTIVE,
      createdBy: randomUUID(),
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemorySuppliersRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Supplier 01',
          description: 'Description 01',
        }),
      ]),
    )
  })

  it('should not be able to create supplier if it already exists', async () => {
    await sut.execute({
      name: 'Supplier 01',
      description: 'Description 01',
      status: SupplierStatus.ACTIVE,
      createdBy: randomUUID(),
    })

    const result = await sut.execute({
      name: 'Supplier 01',
      description: 'Description 01',
      status: SupplierStatus.ACTIVE,
      createdBy: randomUUID(),
    })

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
