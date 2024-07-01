import { InMemoryAccountReceivableMovementsRepository } from 'test/in-memory/in-memory-account-receivable-movements-repository'
import { InMemoryFinancialSecuritiesRepository } from 'test/in-memory/in-memory-financial-securities-repository'
import { CreateAccountReceivableMovementUseCase } from './create-account-receivable-movement'
import { makeFinancialSecurity } from 'test/factories/make-financial-security'
import { AccountReceivableMovementType } from '@/enums/account-receivable-movement'

let inMemoryAccountReceivableMovementsRepository: InMemoryAccountReceivableMovementsRepository
let inMemoryFinancialSecuritiesRepository: InMemoryFinancialSecuritiesRepository

let sut: CreateAccountReceivableMovementUseCase

describe('Create account receivable movement', () => {
  beforeEach(() => {
    inMemoryAccountReceivableMovementsRepository =
      new InMemoryAccountReceivableMovementsRepository()
    inMemoryFinancialSecuritiesRepository =
      new InMemoryFinancialSecuritiesRepository()

    sut = new CreateAccountReceivableMovementUseCase(
      inMemoryAccountReceivableMovementsRepository,
      inMemoryFinancialSecuritiesRepository,
    )
  })

  it('should be able to create a new account receivable movement', async () => {
    const financialSecurityFactory = makeFinancialSecurity()
    const financialSecurity =
      await inMemoryFinancialSecuritiesRepository.create(
        financialSecurityFactory,
      )

    const result = await sut.execute({
      financialSecurityId: financialSecurity.id,
      movementDate: new Date(),
      movementType: AccountReceivableMovementType.PAGAMENTO,
      movementValue: 100,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryAccountReceivableMovementsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          financialSecurityId: financialSecurity.id,
          movementDate: expect.any(Date),
          movementType: AccountReceivableMovementType.PAGAMENTO,
          movementValue: 100,
        }),
      ]),
    )
  })
})
