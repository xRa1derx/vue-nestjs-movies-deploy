import { Body, Controller, Post, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { RegistrationGuard } from './guards/registration.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginGuard } from './guards/login.guard';

@Controller('auth')
export class AuthController {
    constructor(private usersService: UsersService) { }

    @UseGuards(LoginGuard)
    @Post('login')
    async LoginUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
        const user = await this.usersService.login(loginUserDto);
        res.statusCode = HttpStatus.OK
        return res.send({ username: user.username });
    }

    @UseGuards(RegistrationGuard)
    @Post('registration')
    async registrationUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        await this.usersService.registration(createUserDto);
        res.statusCode = HttpStatus.CREATED
        return res.send('user created');
    }
}