import { IsString, IsUUID } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto extends User {
    @IsUUID(4)
    id!: string;
    @IsString()
    name!: string;
    @IsString()
    login!: string;
    @IsString()
    password!: string;
}
