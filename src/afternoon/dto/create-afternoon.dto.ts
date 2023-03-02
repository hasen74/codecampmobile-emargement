import { IsNotEmpty, IsString, IsNumber, MaxLength, IsBoolean } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateAfternoonDto {
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