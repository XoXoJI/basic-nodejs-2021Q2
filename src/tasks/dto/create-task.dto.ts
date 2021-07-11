import { PartialType } from "@nestjs/mapped-types";
import { IsEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import Task from "../entities/task.entity";

export class CreateTaskDto extends PartialType(Task) {
    @IsEmpty()
    id: string;
    @IsString()
    title: string;
    @IsNumber()
    order: number;
    @IsString()
    description: string;
    @IsOptional()
    @IsUUID(4)
    userId?: string;
    @IsOptional()
    @IsUUID(4)
    columnId?: string;
    @IsOptional()
    @IsUUID(4)
    boardId?: string;
}
