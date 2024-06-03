import { InMemoryAccountPayableMovementsRepository } from 'test/in-memory/in-memory-account-payable-movements-repository'
import { InMemoryFinancialSecuritiesRepository } from 'test/in-memory/in-memory-financial-securities-repository'
import { ListAccountPayableMovementByFinancialSecurityIdUseCase } from './list-by-financial-security-id'
import { makeFinancialSecurity } from 'test/factories/make-financial-security'
import { makeAccountPayableMovement } from 'test/factories/make-account-payable-movement'

let inMemoryAccountPayableMovementsRepository: InMemoryAccountPayableMovementsRepository
let inMemoryFinancialSecuritiesRepository: InMemoryFinancialSecuritiesRepository

let sut: ListAccountPayableMovementByFinancialSecurityIdUseCase

describe('List Account Payable Movement By Financial Security Id', () => {
  beforeEach(() => {
    inMemoryAccountPayableMovementsRepository =
      new InMemoryAccountPayableMovementsRepository()
    inMemoryFinancialSecuritiesRepository =
      new InMemoryFinancialSecuritiesRepository()

    sut = new ListAccountPayableMovementByFinancialSecurityIdUseCase(
      inMemoryAccountPayableMovementsRepository,
      inMemoryFinancialSecuritiesRepository,
    )
  })

  it('should be able to list account payable movements by financial security id', async () => {
    const financialSecurity = makeFinancialSecurity()
    inMemoryFinancialSecuritiesRepository.items.push(financialSecurity)

    const accountPayableMovement01 = makeAccountPayableMovement({
      financialSecurityId: financialSecurity.id,
    })

    const accountPayableMovement02 = makeAccountPayableMovement({
      financialSecurityId: financialSecurity.id,
    })

    inMemoryAccountPayableMovementsRepository.items.push(
      accountPayableMovement01,
      accountPayableMovement02,
    )

    const result = await sut.execute({
      financialSecurityId: financialSecurity.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(result.value).toMatchObject({
      accountPayableMovements: expect.arrayContaining([
        expect.objectContaining(accountPayableMovement01),
        expect.objectContaining(accountPayableMovement02),
      ]),
    })
  })
})
