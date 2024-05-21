import { InMemoryProductQuotesRepository } from 'test/in-memory/in-memory-product-quotes-repository'
import { InMemoryProductsRepository } from 'test/in-memory/in-memory-products-repository'
import { InMemorySuppliersRepository } from 'test/in-memory/in-memory-suppliers-repository'
import { InMemoryUsersRepository } from 'test/in-memory/in-memory-users-repository'
import { CreateProductQuoteUseCase } from './create-product-quote'
import { makeProduct } from 'test/factories/make-product'
import { makeSupplier } from 'test/factories/make-supplier'
import { makeUser } from 'test/factories/make-user'

let inMemoryProductQuotesRepository: InMemoryProductQuotesRepository
let inMemorySuppliersRepository: InMemorySuppliersRepository
let inMemoryProductsRepository: InMemoryProductsRepository
let inMemoryUsersRepository: InMemoryUsersRepository

let sut: CreateProductQuoteUseCase

describe('Create product quote', () => {
  beforeEach(() => {
    inMemoryProductQuotesRepository = new InMemoryProductQuotesRepository()
    inMemorySuppliersRepository = new InMemorySuppliersRepository()
    inMemoryProductsRepository = new InMemoryProductsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new CreateProductQuoteUseCase(
      inMemoryProductQuotesRepository,
      inMemorySuppliersRepository,
      inMemoryProductsRepository,
      inMemoryUsersRepository,
    )
  })

  it('should be able to create a product quote', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const productFactory = makeProduct()
    const product = await inMemoryProductsRepository.create(productFactory)

    const supplierFactory = makeSupplier()
    const supplier = await inMemorySuppliersRepository.create(supplierFactory)

    const result = await sut.execute({
      buyerId: user.id,
      productId: product.id,
      supplierId: supplier.id,
      price: 100,
      quoteDate: new Date(),
      expirationDate: new Date(),
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryProductQuotesRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          productId: product.id,
          supplierId: supplier.id,
          price: 100,
          quoteDate: new Date(),
          expirationDate: new Date(),
          buyerId: user.id,
        }),
      ]),
    )
  })
})
