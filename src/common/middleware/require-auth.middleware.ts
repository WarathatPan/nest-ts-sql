/* eslint-disable linebreak-style */
import { DeniedPermission } from '@common/constants';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { SsoService } from '../providers';

@Injectable()
export default class RequireAuthMiddleware implements NestMiddleware {
  constructor(private readonly ssoService: SsoService) {}

  public async use(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    // if (!req.token) throw new UnauthorizedException(DeniedPermission);

    // const userData = await this.ssoService.getUserData(req.token);

    // if (!userData) throw new UnauthorizedException(DeniedPermission);

    // req.user = userData;
    next();
  }
}
