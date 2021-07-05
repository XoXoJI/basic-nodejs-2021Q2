import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import * as _ from "lodash";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async create(createUserDto: CreateUserDto) {
        const userDTO = _.clone(createUserDto);

        userDTO.password = await this.hashPassword(userDTO.password);

        return await this.userRepository.save(userDTO);
    }

    async findAll() {
        return await this.userRepository.find();
    }

    async findOne(id: string) {
        return await this.userRepository.findOne(id);
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const userDTO = _.clone(updateUserDto);

        if(userDTO.password) {
            userDTO.password = await this.hashPassword(userDTO.password);
        }

        return await this.userRepository.save(userDTO);
    }

    async remove(id: string) {
        return await this.userRepository.delete(id);
    }

    async findForAuth(login: string) {
        return await this.userRepository.findOne({
            where: { login }
        });
    }

    private async hashPassword(password: string) {
        const salt = await bcrypt.genSalt();

        const hashPassword = await bcrypt.hash(password, salt);

        return hashPassword;
    }

}
