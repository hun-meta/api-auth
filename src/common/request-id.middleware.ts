import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  constructor(private readonly cls: ClsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const requestId = uuidv4();
    this.cls.set('requestId', requestId);
    
    // 컨트롤러, 서비스에서 사용하는 법
    // const requestId = this.cls.get('requestId');

    next();
  }

}
