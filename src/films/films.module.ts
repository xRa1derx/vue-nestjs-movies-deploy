import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { Film, FilmSchema } from '../schemas/film.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [FilmsService],
  controllers: [FilmsController],
  imports: [
    MongooseModule.forFeature([
      { name: Film.name, schema: FilmSchema }
    ]), AuthModule
  ]
})
export class FilmsModule {
}