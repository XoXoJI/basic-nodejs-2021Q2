import { IsEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateTaskDto {
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
    userId: string;
    @IsOptional()
    @IsUUID(4)
    columnId: string;
}
