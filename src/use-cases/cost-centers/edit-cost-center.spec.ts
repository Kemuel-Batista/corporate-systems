import { InMemoryCostCentersRepository } from 'test/in-memory/in-memory-cost-centers-repository'
import { EditCostCenterUseCase } from './edit-cost-center'
import { randomUUID } from 'node:crypto'
import { describe, beforeEach, it, expect } from 'vitest'
import { ResourceAlreadyExistsError } from '../../core/errors/resource-already-exists-error'
import { makeCostCenter } from 'test/factories/make-cost-center'
import { CostCenterStatus } from '@/enums/cost-center'

let inMemoryCostCentersRepository: InMemoryCostCentersRepository

let sut: EditCostCenterUseCase

describe('Edit CostCenter', () => {
  beforeEach(() => {
    inMemoryCostCentersRepository = new InMemoryCostCentersRepository()

    sut = new EditCostCenterUseCase(inMemoryCostCentersRepository)
  })

  it('should be able to edit costcenter', async () => {
    const costcenterFactory = makeCostCenter()
    const costcenter =
      await inMemoryCostCentersRepository.create(costcenterFactory)

    const result = await sut.execute({
      id: costcenter.id,
      name: 'CostCenter 01',
      code: 'Code 01',
      status: CostCenterStatus.ACTIVE,
      updatedBy: randomUUID(),
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryCostCentersRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'CostCenter 01',
          code: 'Code 01',
        }),
      ]),
    )
  })

  it('should not be able to edit costcenter if it already exists', async () => {
    const costcenterFactory = makeCostCenter({
      code: 'Code 01',
    })
    await inMemoryCostCentersRepository.create(costcenterFactory)

    const costcenterFactory02 = makeCostCenter({})
    const costcenter02 =
      await inMemoryCostCentersRepository.create(costcenterFactory02)

    const result = await sut.execute({
      id: costcenter02.id,
      name: 'CostCenter 01',
      code: 'Code 01',
      status: CostCenterStatus.ACTIVE,
      updatedBy: randomUUID(),
    })

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
