import {
  MiddlewareConsumer,
  Module,
  NestModule,
  // RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';

@Module({
  imports: [SongsModule],
  controllers: [AppController],
  providers: [AppService],
})
// previously: Created common/middleware/logger/logger.middleware.ts
// then add the LoggerMiddleware to the AppModule
// then apply keyword implements NestModule and add consumer
// Compare this snippet from n-fundamentals-pro/src/app.module.ts:
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs'); option no. 1
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST }); // option no. 2
    consumer.apply(LoggerMiddleware).forRoutes(SongsController); // option no. 3
  }
}
