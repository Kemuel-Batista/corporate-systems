import { InMemoryProductsRepository } from 'test/in-memory/in-memory-products-repository'
import { EditProductUseCase } from './edit-product'
import { randomUUID } from 'node:crypto'
import { describe, beforeEach, it, expect } from 'vitest'
import { ResourceAlreadyExistsError } from '../../core/errors/resource-already-exists-error'
import { makeProduct } from 'test/factories/make-product'
import { ProductStatus } from '@/enums/product'

let inMemoryProductsRepository: InMemoryProductsRepository

let sut: EditProductUseCase

describe('Edit Product', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()

    sut = new EditProductUseCase(inMemoryProductsRepository)
  })

  it('should be able to edit product', async () => {
    const productFactory = makeProduct()
    const product = await inMemoryProductsRepository.create(productFactory)

    const result = await sut.execute({
      id: product.id,
      name: 'Product 01',
      description: 'Description 01',
      status: ProductStatus.ACTIVE,
      updatedBy: randomUUID(),
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

  it('should not be able to edit product if it already exists', async () => {
    const productFactory = makeProduct({
      name: 'Product 01',
    })
    await inMemoryProductsRepository.create(productFactory)

    const productFactory02 = makeProduct({})
    const product02 = await inMemoryProductsRepository.create(productFactory02)

    const result = await sut.execute({
      id: product02.id,
      name: 'Product 01',
      description: 'Description 01',
      status: ProductStatus.ACTIVE,
      updatedBy: randomUUID(),
    })

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
