import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Scope,
} from '@nestjs/common';
import { SongsService } from './songs.service';
// Import the CreateSongDTO and use it in the create method
import { CreateSongDTO } from './dto/create-song-dto';
import { Connection } from 'src/common/constants/connection';

// Define the controller and the path AT FIRST it was @Controller('songs')
@Controller({ path: 'songs', scope: Scope.REQUEST })
export class SongsController {
  // Inject the SongsService
  // inside of the constructor instance of the SongsService
  // We are injecting the dependency
  constructor(
    private songsService: SongsService,
    // Inject the OBJECT as a provider
    @Inject('CONNECTION')
    private connection: Connection,
  ) {
    console.log(
      `This is the CONNECTION STRING ${this.connection.CONNECTION_STRING}`,
    );
  }
  // Create a new song ENDPOINT
  @Post()
  create(@Body() createSongDTO: CreateSongDTO) {
    // @Body() createSongDTO: CreateSongDTO // option
    // return 'Create a new song';
    const results = this.songsService.create(createSongDTO); // option
    // return this.songsService.create('Animals by Maroon 5');
    return results;
  }
  // Fetch all songs ENDPOINT
  @Get()
  findAll() {
    try {
      return this.songsService.findAll();
    } catch (e) {
      // console.log('I am in the catch block', e); // Error checking using console
      // We want to send the useful status code in the response using HttpException
      // Exception Filters
      throw new HttpException('Forbidden', HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: e,
      });
    }
    //return 'Find all songs endpoint';
    // return this.songsService.findAll();
  }
  // Fetch a song based on ID ENDPOINT
  @Get(':id')
  findOne(
    // Use the @Param decorator to fetch the ID from the URL
    // Use the ParseIntPipe to convert the ID to a number
    //@Param('id', ParseIntPipe)
    //if you want to customize the error status code
    // instantiate the ParseIntPipe with the status code
    @Param(
      'id', // Built-in ParseIntPipe to convert the ID to a number
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `Fetch song based on ID ${typeof id}`;
  }

  // Update a song based on ID ENDPOINT
  @Put(':id')
  update() {
    return 'Update a song based on ID';
  }
  // Delete a song based on ID ENDPOINT
  @Delete(':id')
  delete() {
    return 'Delete a song based on ID';
  }
}
