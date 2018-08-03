import {NextFunction, Request, Response} from 'express'

declare global {
  namespace Express {
    // tslint:disable-next-line
    interface Response {
      missing(fields: string | string[]): this
    }
  }
}

export function haruhiMiddleware(req: Request, res: Response, next: NextFunction) {
  res.missing = function missing(field: string | string[]) {
    return res.status(400).json({
      message: 'missing ' + field,
    })
  }
  next()
}
