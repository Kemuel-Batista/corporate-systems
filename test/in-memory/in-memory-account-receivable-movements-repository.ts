import { AccountReceivableMovementsRepository } from '@/repositories/account-receivable-movements-repository'
import { AccountReceivableMovement, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryAccountReceivableMovementsRepository
  implements AccountReceivableMovementsRepository
{
  public items: AccountReceivableMovement[] = []

  async create(
    data: Prisma.AccountReceivableMovementUncheckedCreateInput,
  ): Promise<AccountReceivableMovement> {
    const accountReceivableMovement = {
      id: randomUUID(),
      financialSecurityId: data.financialSecurityId,
      movementDate: new Date(data.movementDate),
      movementType: data.movementType,
      movementValue: data.movementValue,
      interestValue: data.interestValue,
      fineValue: data.fineValue,
      createdAt: new Date(),
    }

    this.items.push(accountReceivableMovement)

    return accountReceivableMovement
  }

  async findById(id: string): Promise<AccountReceivableMovement | null> {
    const accountReceivableMovement = this.items.find((item) => item.id === id)

    if (!accountReceivableMovement) {
      return null
    }

    return accountReceivableMovement
  }

  async listByFinancialSecurityId(
    financialSecurityId: string,
  ): Promise<AccountReceivableMovement[]> {
    const accountReceivableMovements = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .filter((item) => item.financialSecurityId === financialSecurityId)

    return accountReceivableMovements
  }
}
