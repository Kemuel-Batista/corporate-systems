import { InMemoryProductsRepository } from 'test/in-memory/in-memory-products-repository'
import { DeleteProductUseCase } from './delete-product'
import { makeProduct } from 'test/factories/make-product'

let inMemoryProductsRepository: InMemoryProductsRepository

let sut: DeleteProductUseCase

describe('Delete product', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()

    sut = new DeleteProductUseCase(inMemoryProductsRepository)
  })

  it('should be able to delete product', async () => {
    const productFactory = makeProduct()
    const product = await inMemoryProductsRepository.create(productFactory)

    const result = await sut.execute({
      id: product.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryProductsRepository.items).toHaveLength(0)
  })
})
