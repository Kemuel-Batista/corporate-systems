import { DepartmentsRepository } from '@/repositories/departments-repository'
import { ResourceAlreadyExistsError } from '../../core/errors/resource-already-exists-error'
import { Department } from '@prisma/client'
import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '../../core/errors/resource-not-found-error'

interface EditDepartmentUseCaseRequest {
  id: string
  name: string
  description: string
  updatedBy: string
}

type EditDepartmentUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    department: Department
  }
>

export class EditDepartmentUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({
    id,
    name,
    description,
    updatedBy,
  }: EditDepartmentUseCaseRequest): Promise<EditDepartmentUseCaseResponse> {
    const department = await this.departmentsRepository.findById(id)

    if (!department) {
      return failure(new ResourceNotFoundError())
    }

    if (department.name !== name) {
      const existingDepartment =
        await this.departmentsRepository.findByName(name)

      if (existingDepartment) {
        return failure(new ResourceAlreadyExistsError())
      }

      department.name = name
    }

    department.description = description
    department.updatedBy = updatedBy

    await this.departmentsRepository.update(department)

    return success({
      department,
    })
  }
}
