import { InMemoryRequisitionsRepository } from 'test/in-memory/in-memory-requisitions-repository'
import { CancelRequisitionUseCase } from './cancel-requisition'
import { makeRequisition } from 'test/factories/make-requisition'
import { RequisitionStatus } from '@/enums/requisition'

let inMemoryRequisitionsRepository: InMemoryRequisitionsRepository

let sut: CancelRequisitionUseCase

describe('Cancel requisition', () => {
  beforeEach(() => {
    inMemoryRequisitionsRepository = new InMemoryRequisitionsRepository()

    sut = new CancelRequisitionUseCase(inMemoryRequisitionsRepository)
  })

  it('should be able to cancel a requisition', async () => {
    const requisitionFactory = makeRequisition()
    const requisition =
      await inMemoryRequisitionsRepository.create(requisitionFactory)

    const result = await sut.execute({
      id: requisition.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryRequisitionsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          status: RequisitionStatus.CANCELED,
        }),
      ]),
    )
  })
})
