import { Injectable } from "@nestjs/common";
import { User } from "src/schemas/user.schema";
import { UsersService } from "src/users/users.service";

@Injectable()

export class AuthService {
    constructor(private usersService: UsersService) { }
    async validateUser(username: string): Promise<User | null> {
        const user = await this.usersService.findOne(username);
        if (!user) {
            return null;
        }
        return user;
    }
}