import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsModule } from './films/films.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { MongooseConfigService } from './config/MongooseConfigService';
import configuration from './config/configuration';

@Module({
  imports: [
    FilmsModule,
    MongooseModule.forRootAsync({ imports: [ConfigModule], useClass: MongooseConfigService }),
    ConfigModule.forRoot({ load: [configuration] }),
    UsersModule,
    AuthModule,
    FilesModule,
    MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
})
export class AppModule { }
