import { InMemoryProductQuotesRepository } from 'test/in-memory/in-memory-product-quotes-repository'
import { InMemoryProductsRepository } from 'test/in-memory/in-memory-products-repository'
import { InMemoryPurchasesRepository } from 'test/in-memory/in-memory-purchases-repository'
import { InMemorySuppliersRepository } from 'test/in-memory/in-memory-suppliers-repository'
import { InMemoryUsersRepository } from 'test/in-memory/in-memory-users-repository'
import { CreatePurchaseUseCase } from './create-purchase'
import { makeUser } from 'test/factories/make-user'
import { makeProduct } from 'test/factories/make-product'
import { makeProductQuote } from 'test/factories/make-product-quote'
import { makeSupplier } from 'test/factories/make-supplier'
import { MinimumNumberOfQuotesIsNotEnoughError } from '@/core/errors/minimum-number-of-quotes-is-not-enough-error'

let inMemoryPurchasesRepository: InMemoryPurchasesRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryProductsRepository: InMemoryProductsRepository
let inMemoryProductQuotesRepository: InMemoryProductQuotesRepository
let inMemorySuppliersRepository: InMemorySuppliersRepository

let sut: CreatePurchaseUseCase

describe('Create purchase', () => {
  beforeEach(() => {
    inMemoryPurchasesRepository = new InMemoryPurchasesRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryProductsRepository = new InMemoryProductsRepository()
    inMemoryProductQuotesRepository = new InMemoryProductQuotesRepository()
    inMemorySuppliersRepository = new InMemorySuppliersRepository()

    sut = new CreatePurchaseUseCase(
      inMemoryPurchasesRepository,
      inMemoryUsersRepository,
      inMemoryProductsRepository,
      inMemoryProductQuotesRepository,
      inMemorySuppliersRepository,
    )
  })

  it('should be able to create a new purchase', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const supplierFactory = makeSupplier()
    const supplier = await inMemorySuppliersRepository.create(supplierFactory)

    const productFactory = makeProduct()
    const product = await inMemoryProductsRepository.create(productFactory)

    const productQuote01Factory = makeProductQuote({
      productId: product.id,
      buyerId: user.id,
      supplierId: supplier.id,
    })
    await inMemoryProductQuotesRepository.create(productQuote01Factory)

    const productQuote02Factory = makeProductQuote({
      productId: product.id,
      buyerId: user.id,
      supplierId: supplier.id,
    })
    await inMemoryProductQuotesRepository.create(productQuote02Factory)

    const productQuoteFactory = makeProductQuote({
      productId: product.id,
      buyerId: user.id,
      supplierId: supplier.id,
    })
    const productQuote =
      await inMemoryProductQuotesRepository.create(productQuoteFactory)

    const result = await sut.execute({
      buyerId: user.id,
      productId: product.id,
      productQuoteId: productQuote.id,
      quantity: 1,
      unitCost: 10,
      supplierId: supplier.id,
      quotes: 10,
      invoiceNumber: '123',
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryPurchasesRepository.items).toHaveLength(1)
    expect(inMemoryPurchasesRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          buyerId: user.id,
          productId: product.id,
          productQuoteId: productQuote.id,
          quantity: 1,
          unitCost: 10,
          supplierId: supplier.id,
          quotes: 10,
          invoiceNumber: '123',
        }),
      ]),
    )
  })

  it('should not be able to create a new purchase if product quotes is lower than three', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const supplierFactory = makeSupplier()
    const supplier = await inMemorySuppliersRepository.create(supplierFactory)

    const productFactory = makeProduct()
    const product = await inMemoryProductsRepository.create(productFactory)

    const productQuoteFactory = makeProductQuote({
      productId: product.id,
      buyerId: user.id,
      supplierId: supplier.id,
    })
    const productQuote =
      await inMemoryProductQuotesRepository.create(productQuoteFactory)

    const result = await sut.execute({
      buyerId: user.id,
      productId: product.id,
      productQuoteId: productQuote.id,
      quantity: 1,
      unitCost: 10,
      supplierId: supplier.id,
      quotes: 10,
      invoiceNumber: '123',
    })

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(MinimumNumberOfQuotesIsNotEnoughError)
  })
})
