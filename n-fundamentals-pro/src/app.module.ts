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
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrm}

const devConfig = { port: 3000 };
const proConfig = { port: 4000 };

@Module({
  imports: [TypeOrmModule.forRoot({}), SongsModule],
  controllers: [AppController],
  providers: [
    AppService,
    // add the DevConfigService to the providers array
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
    {
      provide: 'CONFIG',
      useFactory: () => {
        // useFactory is a function that returns a value
        return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
      },
    },
  ],
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
