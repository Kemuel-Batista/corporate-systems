import { InMemoryPurchasesRepository } from 'test/in-memory/in-memory-purchases-repository'
import { ListPurchasesUseCase } from './list-purchases'
import { makePurchase } from 'test/factories/make-purchase'

let inMemoryPurchasesRepository: InMemoryPurchasesRepository

let sut: ListPurchasesUseCase

describe('List purchases', () => {
  beforeEach(() => {
    inMemoryPurchasesRepository = new InMemoryPurchasesRepository()

    sut = new ListPurchasesUseCase(inMemoryPurchasesRepository)
  })

  it('should be able to list purchases', async () => {
    const purchase = makePurchase()
    inMemoryPurchasesRepository.items.push(purchase)

    const result = await sut.execute()

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.purchases).toHaveLength(1)
    }

    expect(result.value).toMatchObject({
      purchases: expect.arrayContaining([expect.objectContaining(purchase)]),
    })
  })
})
