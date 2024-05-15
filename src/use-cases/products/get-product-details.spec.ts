import { InMemoryProductsRepository } from 'test/in-memory/in-memory-products-repository'
import { GetProductDetailsUseCase } from './get-product-details'
import { makeProduct } from 'test/factories/make-product'

let inMemoryProductsRepository: InMemoryProductsRepository

let sut: GetProductDetailsUseCase

describe('Get product details', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()

    sut = new GetProductDetailsUseCase(inMemoryProductsRepository)
  })

  it('should be able to get product details', async () => {
    const productFactory = makeProduct()
    const product = await inMemoryProductsRepository.create(productFactory)

    const result = await sut.execute({
      id: product.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(result.value).toEqual({
      product: expect.objectContaining({
        id: product.id,
        name: product.name,
        description: product.description,
        createdBy: product.createdBy,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      }),
    })
  })
})
