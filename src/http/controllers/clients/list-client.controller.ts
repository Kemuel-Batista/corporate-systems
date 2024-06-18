import { makeListClientsUseCase } from '@/use-cases/clients/factories/make-list-client'
import { Request, Response } from 'express'

export class ListClientController {
  async handle(_: Request, response: Response): Promise<Response> {
    const listClientUseCase = makeListClientsUseCase()

    const result = await listClientUseCase.execute()

    if (result.isError()) {
      return response.status(400).json('Erro ao listar os clientes')
    }

    const clients = result.value.clients

    return response.status(200).json({
      clients,
    })
  }
}
