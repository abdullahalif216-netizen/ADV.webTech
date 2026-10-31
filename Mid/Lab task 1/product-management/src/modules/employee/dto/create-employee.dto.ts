import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class CreateEmployeeDto {
  @ApiProperty({ example: "Rahim Uddin" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name!: string;

  @ApiProperty({ example: "rahim@example.com" })
  @IsEmail()
  @MaxLength(255)
  email!: string;

  @ApiProperty({ example: "01712345678" })
  @Matches(/^\+?[0-9]{7,15}$/, {
    message: "phone must contain 7 to 15 digits (an optional leading + is allowed)",
  })
  phone!: string;

  @ApiProperty({ example: "dummy123", description: "Dummy password, stored hashed" })
  @IsString()
  @MinLength(6)
  @MaxLength(64)
  password!: string;

  @ApiProperty({ example: 28 })
  @IsInt()
  @Min(18)
  @Max(70)
  age!: number;

  @ApiProperty({ example: 5, description: "Completed years of work experience" })
  @IsInt()
  @Min(0)
  @Max(50)
  yearsOfWorking!: number;
}
