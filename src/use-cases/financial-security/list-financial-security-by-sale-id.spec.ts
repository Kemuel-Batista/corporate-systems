import { InMemoryFinancialSecuritiesRepository } from 'test/in-memory/in-memory-financial-securities-repository'
import { InMemorySalesRepository } from 'test/in-memory/in-memory-sales-repository'
import { ListFinancialSecurityBySaleIdUseCase } from './list-financial-security-by-sale-id'
import { makeSale } from 'test/factories/make-sale'
import { makeFinancialSecurity } from 'test/factories/make-financial-security'
import { InMemorySaleDetailsRepository } from 'test/in-memory/in-memory-sale-details-repository'

let inMemoryFinancialSecuritiesRepository: InMemoryFinancialSecuritiesRepository
let inMemorySalesRepository: InMemorySalesRepository
let inMemorySaleDetailsRepository: InMemorySaleDetailsRepository

let sut: ListFinancialSecurityBySaleIdUseCase

describe('List financial security by sale id', () => {
  beforeEach(() => {
    inMemoryFinancialSecuritiesRepository =
      new InMemoryFinancialSecuritiesRepository()
    inMemorySaleDetailsRepository = new InMemorySaleDetailsRepository()
    inMemorySalesRepository = new InMemorySalesRepository(
      inMemorySaleDetailsRepository,
    )

    sut = new ListFinancialSecurityBySaleIdUseCase(
      inMemoryFinancialSecuritiesRepository,
      inMemorySalesRepository,
    )
  })

  it('should be able to list financial security by sale id', async () => {
    const sale = makeSale()
    inMemorySalesRepository.items.push(sale)

    const financialSecurity = makeFinancialSecurity({
      saleId: sale.id,
    })
    inMemoryFinancialSecuritiesRepository.items.push(financialSecurity)

    const result = await sut.execute({
      saleId: sale.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(result.value).toMatchObject({
      financialSecurities: expect.arrayContaining([
        expect.objectContaining(financialSecurity),
      ]),
    })
  })
})
