import { Either, failure, success } from '@/core/either'
import { DepartmentsRepository } from '@/repositories/departments-repository'
import { ResourceNotFoundError } from '../../core/errors/resource-not-found-error'
import { Department } from '@prisma/client'

interface GetDepartmentDetailsUseCaseRequest {
  id: string
}

type GetDepartmentDetailsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    department: Department
  }
>

export class GetDepartmentDetailsUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({
    id,
  }: GetDepartmentDetailsUseCaseRequest): Promise<GetDepartmentDetailsUseCaseResponse> {
    const department = await this.departmentsRepository.findById(id)

    if (!department) {
      return failure(new ResourceNotFoundError())
    }

    return success({
      department,
    })
  }
}
