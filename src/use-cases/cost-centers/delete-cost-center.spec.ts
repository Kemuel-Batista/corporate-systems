import { InMemoryCostCentersRepository } from 'test/in-memory/in-memory-cost-centers-repository'
import { DeleteCostCenterUseCase } from './delete-cost-center'
import { makeCostCenter } from 'test/factories/make-cost-center'

let inMemoryCostCentersRepository: InMemoryCostCentersRepository

let sut: DeleteCostCenterUseCase

describe('Delete costcenter', () => {
  beforeEach(() => {
    inMemoryCostCentersRepository = new InMemoryCostCentersRepository()

    sut = new DeleteCostCenterUseCase(inMemoryCostCentersRepository)
  })

  it('should be able to delete costcenter', async () => {
    const costcenterFactory = makeCostCenter()
    const costcenter =
      await inMemoryCostCentersRepository.create(costcenterFactory)

    const result = await sut.execute({
      id: costcenter.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryCostCentersRepository.items).toHaveLength(0)
  })
})
