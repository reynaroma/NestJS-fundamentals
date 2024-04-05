import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connection';

// mock data and use it in the module then use useValue
const mockSongsService = {
  findAll() {
    return [{ id: 1, title: 'Lasting Lover', artists: ['Sigala'] }];
  },
};

@Module({
  controllers: [SongsController],
  // provide the SongsService to the SongsModule
  // so that the controller can use the service
  // to fetch the data
  // dependency injection
  // we have provided as a dependency here
  // providers: [SongsService], // option no. 1
  // providers: [
  //   {
  //     provide: SongsService,
  //     useClass: SongsService,
  //   },
  // ], // option no. 2
  // providers: [
  //   SongsService,
  //   {
  //     provide: SongsService,
  //     useValue: mockSongsService, // useValue syntax is useful for injecting constant valuees, external libraries, and configuration values
  //   },
  // ], for mock data
  providers: [
    // using database
    SongsService,
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class SongsModule {}
