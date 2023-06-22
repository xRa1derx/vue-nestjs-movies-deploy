import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film, FilmDocument } from '../schemas/film.schema';

@Injectable()
export class FilmsService {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {
  }

  async getAll(): Promise<Film[]> {
    return this.filmModel.find().exec()
  }

  async getById(id: string): Promise<Film> {
    return this.filmModel.findById(id)
  }

  async create(filmDto: CreateFilmDto): Promise<Film> {
    const newFilm = new this.filmModel(filmDto)
    return newFilm.save()
  }

  async remove(id: string): Promise<Film> {
    return this.filmModel.findByIdAndRemove(id)
  }

  async update(id: string, filmDto: UpdateFilmDto): Promise<Film> {
    return this.filmModel.findByIdAndUpdate(id, filmDto, { new: true })
  }
}