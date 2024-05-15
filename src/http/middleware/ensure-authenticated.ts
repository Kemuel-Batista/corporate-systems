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
    const { id } = verify(token, `${process.env.SECRET_JWT}`) as JwtPayload
    request.user.sub = id
    return next()
  } catch {
    return response.status(401).json({ message: 'Token inválido!' })
  }
}
