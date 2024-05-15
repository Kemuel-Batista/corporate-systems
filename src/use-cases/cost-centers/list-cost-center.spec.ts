import { InMemoryCostCentersRepository } from 'test/in-memory/in-memory-cost-centers-repository'
import { ListCostCentersUseCase } from './list-cost-center'
import { makeCostCenter } from 'test/factories/make-cost-center'

let inMemoryCostCentersRepository: InMemoryCostCentersRepository

let sut: ListCostCentersUseCase

describe('List CostCenters', () => {
  beforeEach(() => {
    inMemoryCostCentersRepository = new InMemoryCostCentersRepository()

    sut = new ListCostCentersUseCase(inMemoryCostCentersRepository)
  })

  it('should list all costcenters', async () => {
    const costcenter1Factory = makeCostCenter()
    const costcenter1 =
      await inMemoryCostCentersRepository.create(costcenter1Factory)

    const costcenter2Factory = makeCostCenter()
    const costcenter2 =
      await inMemoryCostCentersRepository.create(costcenter2Factory)

    const result = await sut.execute()

    expect(result.isSuccess()).toBe(true)

    expect(result.value).toMatchObject({
      costcenters: expect.arrayContaining([
        expect.objectContaining(costcenter1),
        expect.objectContaining(costcenter2),
      ]),
    })
  })
})
