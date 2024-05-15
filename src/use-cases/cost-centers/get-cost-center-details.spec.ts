import { InMemoryCostCentersRepository } from 'test/in-memory/in-memory-cost-centers-repository'
import { GetCostCenterDetailsUseCase } from './get-cost-center-details'
import { makeCostCenter } from 'test/factories/make-cost-center'

let inMemoryCostCentersRepository: InMemoryCostCentersRepository

let sut: GetCostCenterDetailsUseCase

describe('Get costcenter details', () => {
  beforeEach(() => {
    inMemoryCostCentersRepository = new InMemoryCostCentersRepository()

    sut = new GetCostCenterDetailsUseCase(inMemoryCostCentersRepository)
  })

  it('should be able to get costcenter details', async () => {
    const costcenterFactory = makeCostCenter()
    const costcenter =
      await inMemoryCostCentersRepository.create(costcenterFactory)

    const result = await sut.execute({
      id: costcenter.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(result.value).toEqual({
      costcenter: expect.objectContaining({
        id: costcenter.id,
        name: costcenter.name,
        code: costcenter.code,
        createdBy: costcenter.createdBy,
        createdAt: costcenter.createdAt,
        updatedAt: costcenter.updatedAt,
      }),
    })
  })
})
