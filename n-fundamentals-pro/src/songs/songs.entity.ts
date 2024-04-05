import { Playlist } from 'src/playlists/playlist.entity';
import { Artist } from 'src/artists/artist.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity('song')
export class Song {
  @Column('text')
  lyrics: string;

  @Column('time')
  duration: Date;

  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'song_artists' })
  artists: Artist[];

  /**
   * Many songs can belong to a single playlist for each unique user
   */
  @ManyToOne(() => Playlist, (playList) => playList.songs)
  playList: Playlist;
}
