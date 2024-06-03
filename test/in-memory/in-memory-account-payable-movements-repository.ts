import { AccountPayableMovementsRepository } from '@/repositories/account-payable-movements-repository'
import { AccountPayableMovement, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryAccountPayableMovementsRepository
  implements AccountPayableMovementsRepository
{
  public items: AccountPayableMovement[] = []

  async create(
    data: Prisma.AccountPayableMovementUncheckedCreateInput,
  ): Promise<AccountPayableMovement> {
    const accountPayableMovement = {
      id: randomUUID(),
      financialSecurityId: data.financialSecurityId,
      movementDate: new Date(data.movementDate),
      movementType: data.movementType,
      movementValue: data.movementValue,
      interestValue: data.interestValue,
      fineValue: data.fineValue,
      createdAt: new Date(),
    }

    this.items.push(accountPayableMovement)

    return accountPayableMovement
  }

  async findById(id: string): Promise<AccountPayableMovement | null> {
    const accountPayableMovement = this.items.find((item) => item.id === id)

    if (!accountPayableMovement) {
      return null
    }

    return accountPayableMovement
  }

  async listByFinancialSecurityId(
    financialSecurityId: string,
  ): Promise<AccountPayableMovement[]> {
    const accountPayableMovements = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .filter((item) => item.financialSecurityId === financialSecurityId)

    return accountPayableMovements
  }
}
