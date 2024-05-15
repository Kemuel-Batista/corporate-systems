import { CostCenter, Prisma } from '@prisma/client'
import { CostCentersRepository } from '../../src/repositories/cost-centers-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryCostCentersRepository implements CostCentersRepository {
  public items: CostCenter[] = []

  async create(
    data: Prisma.CostCenterUncheckedCreateInput,
  ): Promise<CostCenter> {
    const costCenter = {
      id: randomUUID(),
      name: data.name,
      code: data.code,
      status: data.status,
      createdAt: new Date(),
      createdBy: randomUUID(),
      updatedAt: null,
      updatedBy: null,
    }

    this.items.push(costCenter)

    return costCenter
  }

  async update(data: CostCenter): Promise<CostCenter> {
    const itemIndex = this.items.findIndex((item) => item.id === data.id)

    const costCenter = this.items[itemIndex]

    const costCenterUpdated = {
      ...costCenter,
      name: data.name,
      code: data.code,
      status: data.status,
      updatedBy: data.updatedBy,
    }

    this.items[itemIndex] = costCenterUpdated

    return costCenter
  }

  async findById(id: string): Promise<CostCenter | null> {
    const costCenter = this.items.find((item) => item.id === id)

    if (!costCenter) {
      return null
    }

    return costCenter
  }

  async findByCode(code: string): Promise<CostCenter | null> {
    const costCenter = this.items.find((item) => item.code === code)

    if (!costCenter) {
      return null
    }

    return costCenter
  }

  async list(): Promise<CostCenter[]> {
    const costCenters = this.items.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )

    return costCenters
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(itemIndex, 1)
  }
}
