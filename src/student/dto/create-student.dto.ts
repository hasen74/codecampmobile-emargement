import { IsNotEmpty, IsObject, IsString, MaxLength } from "class-validator";
export class CreateStudentDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly login: string;
    @IsString()
    fcmToken: string;
    @IsString()
    password: string;
}