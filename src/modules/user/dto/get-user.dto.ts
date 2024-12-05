import {OmitType} from "@nestjs/swagger";
import {UpdateUserDto} from "./update-user.dto";

export class GetUserDto extends OmitType(UpdateUserDto, ['password']) {}