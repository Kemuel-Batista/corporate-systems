import { Either, failure, success } from '@/core/either'
import { DepartmentsRepository } from '@/repositories/departments-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface DeleteDepartmentUseCaseRequest {
  id: string
}

type DeleteDepartmentUseCaseResponse = Either<ResourceNotFoundError, null>

export class DeleteDepartmentUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({
    id,
  }: DeleteDepartmentUseCaseRequest): Promise<DeleteDepartmentUseCaseResponse> {
    const department = await this.departmentsRepository.findById(id)

    if (!department) {
      return failure(new ResourceNotFoundError())
    }

    await this.departmentsRepository.delete(id)

    return success(null)
  }
}
