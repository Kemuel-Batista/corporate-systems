import { InMemoryAccountPayableMovementsRepository } from 'test/in-memory/in-memory-account-payable-movements-repository'
import { InMemoryFinancialSecuritiesRepository } from 'test/in-memory/in-memory-financial-securities-repository'
import { CreateAccountPayableMovementUseCase } from './create-account-payable-movement'
import { makeFinancialSecurity } from 'test/factories/make-financial-security'
import { AccountPayableMovementType } from '@/enums/account-payable-movement'

let inMemoryAccountPayableMovementsRepository: InMemoryAccountPayableMovementsRepository
let inMemoryFinancialSecuritiesRepository: InMemoryFinancialSecuritiesRepository

let sut: CreateAccountPayableMovementUseCase

describe('Create account payable movement', () => {
  beforeEach(() => {
    inMemoryAccountPayableMovementsRepository =
      new InMemoryAccountPayableMovementsRepository()
    inMemoryFinancialSecuritiesRepository =
      new InMemoryFinancialSecuritiesRepository()

    sut = new CreateAccountPayableMovementUseCase(
      inMemoryAccountPayableMovementsRepository,
      inMemoryFinancialSecuritiesRepository,
    )
  })

  it('should be able to create a new account payable movement', async () => {
    const financialSecurityFactory = makeFinancialSecurity()
    const financialSecurity =
      await inMemoryFinancialSecuritiesRepository.create(
        financialSecurityFactory,
      )

    const result = await sut.execute({
      financialSecurityId: financialSecurity.id,
      movementDate: new Date(),
      movementType: AccountPayableMovementType.PAGAMENTO,
      movementValue: 100,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryAccountPayableMovementsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          financialSecurityId: financialSecurity.id,
          movementDate: expect.any(Date),
          movementType: AccountPayableMovementType.PAGAMENTO,
          movementValue: 100,
        }),
      ]),
    )
  })
})
