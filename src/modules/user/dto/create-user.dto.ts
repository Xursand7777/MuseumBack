import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../../../common/constants/roles.enum";
import {
    ArrayNotEmpty,
    ArrayUnique,
    IsArray,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({nullable: true})
    @IsString()
    name: string;

    @ApiProperty({
        example: [Role.Admin],
        description: 'List of user roles',
        type: [String],
    })
    @IsArray()
    @ArrayNotEmpty({ message: 'At least one role must be specified' })
    @ArrayUnique({ message: 'Roles must be unique' })
    @IsEnum(Role, { each: true, message: 'Each role must be a valid Role' })
    roles: Role[];
}
