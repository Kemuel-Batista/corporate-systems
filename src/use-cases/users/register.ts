import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { ResourceAlreadyExistsError } from '../../core/errors/resource-already-exists-error'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  departmentId: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    departmentId,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new ResourceAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
      departmentId,
    })

    return {
      user,
    }
  }
}
