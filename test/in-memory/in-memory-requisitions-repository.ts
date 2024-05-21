import { Requisition, Prisma } from '@prisma/client'
import { RequisitionsRepository } from '../../src/repositories/requisitions-repository'
import { randomUUID } from 'node:crypto'
import { RequisitionStatus } from '@/enums/requisition'

export class InMemoryRequisitionsRepository implements RequisitionsRepository {
  public items: Requisition[] = []

  async create(
    data: Prisma.RequisitionUncheckedCreateInput,
  ): Promise<Requisition> {
    const requisition = {
      id: randomUUID(),
      costCenterId: data.costCenterId,
      productId: data.productId,
      quantity: data.quantity,
      status: data.status,
      createdAt: new Date(),
      createdBy: data.createdBy,
    }

    this.items.push(requisition)

    return requisition
  }

  async findById(id: string): Promise<Requisition | null> {
    const requisition = this.items.find((item) => item.id === id)

    if (!requisition) {
      return null
    }

    return requisition
  }

  async list(): Promise<Requisition[]> {
    const requisitions = this.items.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )

    return requisitions
  }

  async listByProductId(productId: string): Promise<Requisition[]> {
    const requisitions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .filter((item) => item.productId === productId)

    return requisitions
  }

  async cancel(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id)

    const requisition = this.items[itemIndex]

    const requisitionUpdated = {
      ...requisition,
      status: RequisitionStatus.CANCELED,
    }

    this.items[itemIndex] = requisitionUpdated
  }
}
