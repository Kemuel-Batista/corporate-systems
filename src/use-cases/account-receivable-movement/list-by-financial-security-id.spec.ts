import { InMemoryAccountReceivableMovementsRepository } from 'test/in-memory/in-memory-account-receivable-movements-repository'
import { InMemoryFinancialSecuritiesRepository } from 'test/in-memory/in-memory-financial-securities-repository'
import { ListAccountReceivableMovementByFinancialSecurityIdUseCase } from './list-by-financial-security-id'
import { makeFinancialSecurity } from 'test/factories/make-financial-security'
import { makeAccountReceivableMovement } from 'test/factories/make-account-receivable-movement'

let inMemoryAccountReceivableMovementsRepository: InMemoryAccountReceivableMovementsRepository
let inMemoryFinancialSecuritiesRepository: InMemoryFinancialSecuritiesRepository

let sut: ListAccountReceivableMovementByFinancialSecurityIdUseCase

describe('List Account Receivable Movement By Financial Security Id', () => {
  beforeEach(() => {
    inMemoryAccountReceivableMovementsRepository =
      new InMemoryAccountReceivableMovementsRepository()
    inMemoryFinancialSecuritiesRepository =
      new InMemoryFinancialSecuritiesRepository()

    sut = new ListAccountReceivableMovementByFinancialSecurityIdUseCase(
      inMemoryAccountReceivableMovementsRepository,
      inMemoryFinancialSecuritiesRepository,
    )
  })

  it('should be able to list account receivable movements by financial security id', async () => {
    const financialSecurity = makeFinancialSecurity()
    inMemoryFinancialSecuritiesRepository.items.push(financialSecurity)

    const accountReceivableMovement01 = makeAccountReceivableMovement({
      financialSecurityId: financialSecurity.id,
    })

    const accountReceivableMovement02 = makeAccountReceivableMovement({
      financialSecurityId: financialSecurity.id,
    })

    inMemoryAccountReceivableMovementsRepository.items.push(
      accountReceivableMovement01,
      accountReceivableMovement02,
    )

    const result = await sut.execute({
      financialSecurityId: financialSecurity.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(result.value).toMatchObject({
      accountReceivableMovements: expect.arrayContaining([
        expect.objectContaining(accountReceivableMovement01),
        expect.objectContaining(accountReceivableMovement02),
      ]),
    })
  })
})
