import { Type } from "class-transformer";
import { IsArray, IsEmpty, IsString, ValidateNested } from "class-validator";
import { Column } from "../../columns/entities/column.entity";
import { Board } from "../entities/board.entity";

export class CreateBoardDto extends Board {
    @IsEmpty()
    id!: string;

    @IsString()
    title!: string;

    @IsArray()
    @ValidateNested()
    @Type(() => Column)
    columns!: Column[];
}
