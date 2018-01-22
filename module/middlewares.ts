import {NextFunction, Request, Response} from 'express'

declare global {
  namespace Express {
    interface Response {
      missing(field: string): this
      missing(fields: string[]): this
    }
  }
}

export function haruhiMiddleware(req: Request, res: Response, next: NextFunction) {
  res.missing = function (field: string | string[]) {
    return res.status(400).json({
      message: 'missing ' + field
    })
  }
  next()
}
