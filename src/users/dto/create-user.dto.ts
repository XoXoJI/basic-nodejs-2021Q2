import { IsEmpty, IsString } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto extends User {
    @IsEmpty()
    id!: string;
    @IsString()
    name!: string;
    @IsString()
    login!: string;
    @IsString()
    password!: string;
}
