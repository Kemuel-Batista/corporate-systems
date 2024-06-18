import { env } from '@/env'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface JwtPayload {
  id: string
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Response | void {
  const { authorization } = request.headers

  if (!authorization) {
    return response.status(401).json({ message: 'Não autorizado!' })
  }

  const token = authorization.split(' ')[1]

  try {
    const { id } = verify(token, `${env.SECRET_JWT}`) as JwtPayload

    if (!request.user) {
      request.user = { sub: '' }
    }

    request.user.sub = id
    next()
  } catch (error) {
    console.error('Erro ao verificar token:', error)
    return response.status(401).json({ message: 'Token inválido!' })
  }
}
