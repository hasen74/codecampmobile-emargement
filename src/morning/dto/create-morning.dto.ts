import { IsNotEmpty, IsString, IsBoolean } from "class-validator";

export class CreateMorningDto {
  @IsNotEmpty()
  studentId: string;
  @IsBoolean()
  scanned: boolean;
  @IsString()
  status: string;
  @IsString()
  date: string;
  @IsString()
  signedinAt: string;
  @IsString()
  document: string;
}
