import { InMemoryCostCentersRepository } from 'test/in-memory/in-memory-cost-centers-repository'
import { CreateCostCenterUseCase } from './create-cost-center'
import { randomUUID } from 'node:crypto'
import { describe, beforeEach, it, expect } from 'vitest'
import { ResourceAlreadyExistsError } from '../../core/errors/resource-already-exists-error'
import { CostCenterStatus } from '@/enums/cost-center'

let inMemoryCostCentersRepository: InMemoryCostCentersRepository

let sut: CreateCostCenterUseCase

describe('Create CostCenter', () => {
  beforeEach(() => {
    inMemoryCostCentersRepository = new InMemoryCostCentersRepository()

    sut = new CreateCostCenterUseCase(inMemoryCostCentersRepository)
  })

  it('should be able to create costcenter', async () => {
    const result = await sut.execute({
      name: 'CostCenter 01',
      code: 'Code 01',
      status: CostCenterStatus.ACTIVE,
      createdBy: randomUUID(),
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

  it('should not be able to create costcenter if it already exists', async () => {
    await sut.execute({
      name: 'CostCenter 01',
      code: 'Code 01',
      status: CostCenterStatus.ACTIVE,
      createdBy: randomUUID(),
    })

    const result = await sut.execute({
      name: 'CostCenter 01',
      code: 'Code 01',
      status: CostCenterStatus.ACTIVE,
      createdBy: randomUUID(),
    })

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
