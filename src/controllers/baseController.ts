import { Response, NextFunction, Request } from 'express';
import { responseStatuses } from '../utils/response';

abstract class BaseService {
  protected wrap(fn: {
    (
      req: Request<Record<string, any>>
    ): Promise<any>;
    apply?: any;
  }) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await fn(req);
        return this.responseHandler(res, data);
      } catch (e) {
        return next(e);
      }
    };
  }

  protected responseHandler(
    res: Response,
    data = null,
    message = "",
    details = {},
    name = "SUCCESS"
  ) {
    return res.status(responseStatuses(res.req.method)).json({
      status: name,
      message,
      details,
      data,
      errors: null,
    });
  }
}

export default BaseService;
