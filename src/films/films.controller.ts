import {
  Body,
  UploadedFile,
  UseInterceptors,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Patch
} from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { FilmsService } from './films.service';
import { Film } from '../schemas/film.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';

@Controller('movies')
export class FilmsController {

  constructor(private readonly filmsService: FilmsService) {
  }

  @Get()
  getAll(): Promise<Film[]> {
    return this.filmsService.getAll()
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Film> {
    return this.filmsService.getById(id)
  }

  @Post()
  @UseInterceptors(FileInterceptor('poster', {
    storage: diskStorage({
      destination: './frontend/public/posters',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }),)
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@UploadedFile() poster, @Body() createFilmDto: CreateFilmDto): Promise<Film> {
    const res = { ...createFilmDto, poster: poster.filename };
    return this.filmsService.create(res)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Film> {
    return this.filmsService.remove(id)
  }



  @Patch(':id')
  @UseInterceptors(FileInterceptor('poster', {
    storage: diskStorage({
      destination: './frontend/public/posters',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }),)
  update(@UploadedFile() poster, @Body() updateFilmDto: UpdateFilmDto, @Param('id') id: string): Promise<Film> {
    console.log(updateFilmDto);
    
    let res = { ...updateFilmDto };
    if (poster) {
      res = { ...updateFilmDto, poster: poster.filename };
    }
    return this.filmsService.update(id, res)
  }

}