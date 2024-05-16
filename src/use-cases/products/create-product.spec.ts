import { InMemoryProductsRepository } from 'test/in-memory/in-memory-products-repository'
import { CreateProductUseCase } from './create-product'
import { randomUUID } from 'node:crypto'
import { describe, beforeEach, it, expect } from 'vitest'
import { ResourceAlreadyExistsError } from '../../core/errors/resource-already-exists-error'
import { ProductStatus } from '@/enums/product'

let inMemoryProductsRepository: InMemoryProductsRepository

let sut: CreateProductUseCase

describe('Create Product', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()

    sut = new CreateProductUseCase(inMemoryProductsRepository)
  })

  it('should be able to create product', async () => {
    const result = await sut.execute({
      name: 'Product 01',
      description: 'Description 01',
      status: ProductStatus.ACTIVE,
      createdBy: randomUUID(),
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryProductsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Product 01',
          description: 'Description 01',
        }),
      ]),
    )
  })

  it('should not be able to create product if it already exists', async () => {
    await sut.execute({
      name: 'Product 01',
      description: 'Description 01',
      status: ProductStatus.ACTIVE,
      createdBy: randomUUID(),
    })

    const result = await sut.execute({
      name: 'Product 01',
      description: 'Description 01',
      status: ProductStatus.ACTIVE,
      createdBy: randomUUID(),
    })

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
