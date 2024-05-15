import { InMemoryDepartmentsRepository } from 'test/in-memory/in-memory-departments-repository'
import { GetDepartmentDetailsUseCase } from './get-department-details'
import { makeDepartment } from 'test/factories/make-department'

let inMemoryDepartmentsRepository: InMemoryDepartmentsRepository

let sut: GetDepartmentDetailsUseCase

describe('Get department details', () => {
  beforeEach(() => {
    inMemoryDepartmentsRepository = new InMemoryDepartmentsRepository()

    sut = new GetDepartmentDetailsUseCase(inMemoryDepartmentsRepository)
  })

  it('should be able to get department details', async () => {
    const departmentFactory = makeDepartment()
    const department =
      await inMemoryDepartmentsRepository.create(departmentFactory)

    const result = await sut.execute({
      id: department.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(result.value).toEqual({
      department: expect.objectContaining({
        id: department.id,
        name: department.name,
        description: department.description,
        createdBy: department.createdBy,
        createdAt: department.createdAt,
        updatedAt: department.updatedAt,
      }),
    })
  })
})
