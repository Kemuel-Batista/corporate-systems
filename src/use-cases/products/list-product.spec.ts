import { InMemoryProductsRepository } from 'test/in-memory/in-memory-products-repository'
import { ListProductsUseCase } from './list-product'
import { makeProduct } from 'test/factories/make-product'

let inMemoryProductsRepository: InMemoryProductsRepository

let sut: ListProductsUseCase

describe('List Products', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()

    sut = new ListProductsUseCase(inMemoryProductsRepository)
  })

  it('should list all products', async () => {
    const product1Factory = makeProduct()
    const product1 = await inMemoryProductsRepository.create(product1Factory)

    const product2Factory = makeProduct()
    const product2 = await inMemoryProductsRepository.create(product2Factory)

    const result = await sut.execute()

    expect(result.isSuccess()).toBe(true)

    expect(result.value).toMatchObject({
      products: expect.arrayContaining([
        expect.objectContaining(product1),
        expect.objectContaining(product2),
      ]),
    })
  })
})
