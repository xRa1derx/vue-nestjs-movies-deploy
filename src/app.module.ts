import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmsModule } from './films/films.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';

@Module({
  imports: [
    FilmsModule,
    MongooseModule.forRoot(`mongodb+srv://raider742617:varvara24082015@cluster0.kmqltpf.mongodb.net/?retryWrites=true&w=majority`),
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
