import { Prisma, AccountReceivableMovement } from '@prisma/client'

export interface AccountReceivableMovementsRepository {
  create(
    data: Prisma.AccountReceivableMovementUncheckedCreateInput,
  ): Promise<AccountReceivableMovement>
  findById(id: string): Promise<AccountReceivableMovement | null>
  listByFinancialSecurityId(
    financialSecurityId: string,
  ): Promise<AccountReceivableMovement[]>
}
