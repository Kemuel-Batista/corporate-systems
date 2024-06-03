import { Prisma, AccountPayableMovement } from '@prisma/client'

export interface AccountPayableMovementsRepository {
  create(
    data: Prisma.AccountPayableMovementUncheckedCreateInput,
  ): Promise<AccountPayableMovement>
  findById(id: string): Promise<AccountPayableMovement | null>
  listByFinancialSecurityId(
    financialSecurityId: string,
  ): Promise<AccountPayableMovement[]>
}
