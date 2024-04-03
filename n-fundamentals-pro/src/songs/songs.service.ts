import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  // local db
  // local array

  private readonly songs = [];
  // Save the song in the database
  create(song) {
    this.songs.push(song);
    return this.songs;
  }
  // Fetch all songs
  findAll() {
    // fetch the songs from the database
    // Errors comes while fetching the data from the database
    // exception handling
    // throw new Error('Error in Database while fetching the data');
    return this.songs;
  }
}
