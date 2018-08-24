import * as bunyan from 'bunyan'
import {NextFunction, Request, Response} from 'express'
import {logger as loggerConfig} from '../config'

const Logger = bunyan.createLogger(loggerConfig.middleware as any)

export interface IServicedRequest<T> extends Request {
  service: T
}

declare global {
  namespace Express {
    // tslint:disable-next-line
    interface Request {
      logger: bunyan
    }
    // tslint:disable-next-line
    interface Response {
      missing(fields: string | string[]): this
    }
  }
}

export function haruhiMiddleware(req: Request, res: Response, next: NextFunction) {
  res.missing = function missing(field: string | string[]) {
    return res.status(400)
      .json({
        message: 'missing ' + field.toString(),
      })
  }
  req.logger = Logger.child({req})
  next()
}
