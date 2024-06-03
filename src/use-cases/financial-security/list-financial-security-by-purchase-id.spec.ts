import { InMemoryFinancialSecuritiesRepository } from 'test/in-memory/in-memory-financial-securities-repository'
import { InMemoryPurchasesRepository } from 'test/in-memory/in-memory-purchases-repository'
import { ListFinancialSecurityByPurchaseIdUseCase } from './list-financial-security-by-purchase-id'
import { makePurchase } from 'test/factories/make-purchase'
import { makeFinancialSecurity } from 'test/factories/make-financial-security'

let inMemoryFinancialSecuritiesRepository: InMemoryFinancialSecuritiesRepository
let inMemoryPurchasesRepository: InMemoryPurchasesRepository

let sut: ListFinancialSecurityByPurchaseIdUseCase

describe('List financial security by purchase id', () => {
  beforeEach(() => {
    inMemoryFinancialSecuritiesRepository =
      new InMemoryFinancialSecuritiesRepository()
    inMemoryPurchasesRepository = new InMemoryPurchasesRepository()

    sut = new ListFinancialSecurityByPurchaseIdUseCase(
      inMemoryFinancialSecuritiesRepository,
      inMemoryPurchasesRepository,
    )
  })

  it('should be able to list financial security by purchase id', async () => {
    const purchase = makePurchase()
    inMemoryPurchasesRepository.items.push(purchase)

    const financialSecurity = makeFinancialSecurity({
      purchaseId: purchase.id,
    })
    inMemoryFinancialSecuritiesRepository.items.push(financialSecurity)

    const result = await sut.execute({
      purchaseId: purchase.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(result.value).toMatchObject({
      financialSecurities: expect.arrayContaining([
        expect.objectContaining(financialSecurity),
      ]),
    })
  })
})
