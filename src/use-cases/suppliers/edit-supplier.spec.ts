import { InMemorySuppliersRepository } from 'test/in-memory/in-memory-suppliers-repository'
import { EditSupplierUseCase } from './edit-supplier'
import { randomUUID } from 'node:crypto'
import { describe, beforeEach, it, expect } from 'vitest'
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error'
import { makeSupplier } from 'test/factories/make-supplier'
import { SupplierStatus } from '@/enums/supplier'

let inMemorySuppliersRepository: InMemorySuppliersRepository

let sut: EditSupplierUseCase

describe('Edit Supplier', () => {
  beforeEach(() => {
    inMemorySuppliersRepository = new InMemorySuppliersRepository()

    sut = new EditSupplierUseCase(inMemorySuppliersRepository)
  })

  it('should be able to edit supplier', async () => {
    const supplierFactory = makeSupplier()
    const supplier = await inMemorySuppliersRepository.create(supplierFactory)

    const result = await sut.execute({
      id: supplier.id,
      name: 'Supplier 01',
      description: 'Description 01',
      status: SupplierStatus.ACTIVE,
      updatedBy: randomUUID(),
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

  it('should not be able to edit supplier if it already exists', async () => {
    const supplierFactory = makeSupplier({
      name: 'Supplier 01',
    })
    await inMemorySuppliersRepository.create(supplierFactory)

    const supplierFactory02 = makeSupplier({})
    const supplier02 =
      await inMemorySuppliersRepository.create(supplierFactory02)

    const result = await sut.execute({
      id: supplier02.id,
      name: 'Supplier 01',
      description: 'Description 01',
      status: SupplierStatus.ACTIVE,
      updatedBy: randomUUID(),
    })

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
