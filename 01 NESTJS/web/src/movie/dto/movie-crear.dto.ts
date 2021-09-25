import {
    IsEmpty,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
    IsNumber,
    IsPositive, IsDate, IsBoolean,
} from 'class-validator';

export class MovieCrearDto {
    @IsNotEmpty() //Requericdo
    @IsString()
    @MinLength(2)
    @MaxLength(25)
    nombre: string;

    @IsNotEmpty() //Requericdo
    @IsString()
    @MinLength(2)
    @MaxLength(25)
    director: string;

    @IsNotEmpty() //Debe estar vacio
    @IsDate()
    fechaEstreno: Date;

    @IsNotEmpty() //Requericdo
    @IsNumber()
    @IsPositive()
    taquilla: number;

    @IsBoolean()
    @IsOptional()
    cartelera: boolean;
}