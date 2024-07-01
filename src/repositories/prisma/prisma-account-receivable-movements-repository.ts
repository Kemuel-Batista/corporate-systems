import { AccountReceivableMovement, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { AccountReceivableMovementsRepository } from '../account-receivable-movements-repository'

export class PrismaAccountReceivableMovementsRepository
  implements AccountReceivableMovementsRepository
{
  async create({
    financialSecurityId,
    movementDate,
    movementType,
    movementValue,
    fineValue,
    interestValue,
  }: Prisma.AccountReceivableMovementUncheckedCreateInput): Promise<AccountReceivableMovement> {
    const accountReceivableMovement =
      await prisma.accountReceivableMovement.create({
        data: {
          financialSecurityId,
          movementDate,
          movementType,
          movementValue,
          fineValue,
          interestValue,
        },
      })
    return accountReceivableMovement
  }

  async findById(id: string): Promise<AccountReceivableMovement | null> {
    const accountReceivableMovement =
      await prisma.accountReceivableMovement.findUnique({
        where: {
          id,
        },
      })

    return accountReceivableMovement
  }

  async listByFinancialSecurityId(
    financialSecurityId: string,
  ): Promise<AccountReceivableMovement[]> {
    const accountReceivableMovements =
      await prisma.accountReceivableMovement.findMany({
        where: {
          financialSecurityId,
        },
      })

    return accountReceivableMovements
  }
}
