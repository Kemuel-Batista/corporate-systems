import { Prisma, CostCenter } from '@prisma/client'

export interface CostCentersRepository {
  create(data: Prisma.CostCenterUncheckedCreateInput): Promise<CostCenter>
  update(data: CostCenter): Promise<CostCenter>
  findById(id: string): Promise<CostCenter | null>
  findByCode(code: string): Promise<CostCenter | null>
  list(): Promise<CostCenter[]>
  delete(id: string): Promise<void>
}
