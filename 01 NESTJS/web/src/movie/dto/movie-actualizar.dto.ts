import {
    IsBoolean,
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString, Max,
    MaxLength,
    MinLength
} from "class-validator";

export class MovieActualizarDto{
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
    @Max(10000000000)
    taquilla: number;

    @IsBoolean()
    @IsOptional()
    cartelera: boolean;
}