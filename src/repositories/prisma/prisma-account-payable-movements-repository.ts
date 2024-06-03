import { AccountPayableMovement, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { AccountPayableMovementsRepository } from '../account-payable-movements-repository'

export class PrismaAccountPayableMovementsRepository
  implements AccountPayableMovementsRepository
{
  async create({
    financialSecurityId,
    movementDate,
    movementType,
    movementValue,
    fineValue,
    interestValue,
  }: Prisma.AccountPayableMovementUncheckedCreateInput): Promise<AccountPayableMovement> {
    const accountPayableMovement = await prisma.accountPayableMovement.create({
      data: {
        financialSecurityId,
        movementDate,
        movementType,
        movementValue,
        fineValue,
        interestValue,
      },
    })
    return accountPayableMovement
  }

  async findById(id: string): Promise<AccountPayableMovement | null> {
    const accountPayableMovement =
      await prisma.accountPayableMovement.findUnique({
        where: {
          id,
        },
      })

    return accountPayableMovement
  }

  async listByFinancialSecurityId(
    financialSecurityId: string,
  ): Promise<AccountPayableMovement[]> {
    const accountPayableMovements =
      await prisma.accountPayableMovement.findMany({
        where: {
          financialSecurityId,
        },
      })

    return accountPayableMovements
  }
}
