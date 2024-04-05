import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';

@Injectable()
export class AppService {
  // add the DevConfigService to the constructor from app.module.ts
  constructor(
    private devConfigService: DevConfigService,
    @Inject('CONFIG')
    private config: { port: string },
  ) {}

  getHello(): string {
    return `Hello I am learning NestJS fundamentals ${this.devConfigService.getDBHOST()} PORT = ${this.config.port}`;
  }
}
