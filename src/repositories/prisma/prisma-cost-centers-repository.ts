import { CostCenter, Prisma } from '@prisma/client'
import { CostCentersRepository } from '../cost-centers-repository'
import { prisma } from '@/lib/prisma'
import { CostCenterStatus } from '@/enums/cost-center'

export class PrismaCostCentersRepository implements CostCentersRepository {
  async create({
    name,
    code,
    status,
    createdBy,
  }: Prisma.CostCenterUncheckedCreateInput): Promise<CostCenter> {
    const costCenter = await prisma.costCenter.create({
      data: {
        name,
        code,
        status,
        createdBy,
      },
    })
    return costCenter
  }

  async update({
    id,
    name,
    code,
    status,
    updatedBy,
  }: CostCenter): Promise<CostCenter> {
    const costCenter = await prisma.costCenter.update({
      where: {
        id,
      },
      data: {
        name: name ?? undefined,
        code: code ?? undefined,
        status: status ?? undefined,
        updatedBy,
      },
    })

    return costCenter
  }

  async findById(id: string): Promise<CostCenter | null> {
    const costCenter = await prisma.costCenter.findUnique({
      where: {
        id,
      },
    })

    return costCenter
  }

  async findByCode(code: string): Promise<CostCenter | null> {
    const costCenter = await prisma.costCenter.findUnique({
      where: {
        code,
      },
    })

    return costCenter
  }

  async list(): Promise<CostCenter[]> {
    const costCenters = await prisma.costCenter.findMany({
      where: {
        status: CostCenterStatus.ACTIVE,
      },
    })

    return costCenters
  }

  async delete(id: string): Promise<void> {
    await prisma.costCenter.delete({
      where: {
        id,
      },
    })
  }
}
