import { Requisition, Prisma } from '@prisma/client'
import { RequisitionsRepository } from '../requisitions-repository'
import { prisma } from '@/lib/prisma'
import { RequisitionStatus } from '@/enums/requisition'

export class PrismaRequisitionsRepository implements RequisitionsRepository {
  async create({
    costCenterId,
    productId,
    quantity,
    status,
    createdBy,
  }: Prisma.RequisitionUncheckedCreateInput): Promise<Requisition> {
    const requisition = await prisma.requisition.create({
      data: {
        costCenterId,
        productId,
        quantity,
        status,
        createdBy,
      },
    })
    return requisition
  }

  async findById(id: string): Promise<Requisition | null> {
    const requisition = await prisma.requisition.findUnique({
      where: {
        id,
      },
    })

    return requisition
  }

  async list(): Promise<Requisition[]> {
    const requisitions = await prisma.requisition.findMany()

    return requisitions
  }

  async listByProductId(productId: string): Promise<Requisition[]> {
    const requisitions = await prisma.requisition.findMany({
      where: {
        productId,
      },
    })

    return requisitions
  }

  async cancel(id: string): Promise<void> {
    await prisma.requisition.update({
      where: {
        id,
      },
      data: {
        status: RequisitionStatus.CANCELED,
      },
    })
  }
}
