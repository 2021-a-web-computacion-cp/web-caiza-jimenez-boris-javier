import {
    IsBoolean,
    IsDate,
    IsEmpty, IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional, IsPositive,
    IsString, Max,
    MaxLength, Min,
    MinLength
} from "class-validator";

export class  peliculaCrearDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(25)
    nombre: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(25)
    director: string;

    @IsInt()
    taquilla: number;


    @IsNotEmpty()
    @IsDate()
    fechaEstreno: Date;


    @IsOptional()
    @IsBoolean()
    @IsNumber()
    cartelera: boolean;

}