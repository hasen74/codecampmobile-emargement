import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMorningDto } from 'src/morning/dto/create-morning.dto';
import { IMorning } from 'src/morning/interface/morning.interface';
import { Model } from "mongoose";
import { UpdateMorningDto } from 'src/morning/dto/update-morning.dto';

@Injectable()
export class MorningService {
constructor(@InjectModel('Morning') private morningModel:Model<IMorning>) { }
async createMorning(createMorningDto: CreateMorningDto): Promise<IMorning> {
   const newMorning = await new this.morningModel(createMorningDto);
   return newMorning.save();
}

async updateMorning(morningId: string, updateMorningDto: UpdateMorningDto): Promise<IMorning> {
    const existingMorning = await        this.morningModel.findByIdAndUpdate(morningId, updateMorningDto, { new: true });
   if (!existingMorning) {
     throw new NotFoundException(`Morning #${morningId} not found`);
   }
   return existingMorning;
}

async updateMorningStudate(studentId: string, date: string, updateMorningDto: UpdateMorningDto): Promise<IMorning> {
  const modifiedDate = date.replace(/-/g, '/')
  console.log(modifiedDate)
  const existingMorning = await this.morningModel.findOneAndUpdate({studentId: studentId, date: modifiedDate}, updateMorningDto, { new: true });
 if (!existingMorning) {
   throw new NotFoundException(`Morning ${studentId} on date ${date} not found`);
 }
 return existingMorning;
}

async getAllMornings(): Promise<IMorning[]> {
    const morningData = await this.morningModel.find();
    if (!morningData || morningData.length == 0) {
        throw new NotFoundException('Mornings data not found!');
    }
    return morningData;
}

async getMorning(morningId: string): Promise<IMorning> {
   const existingMorning = await     this.morningModel.findById(morningId).exec();
   if (!existingMorning) {
    throw new NotFoundException(`Morning #${morningId} not found`);
   }
   return existingMorning;
}

async getAllMorningsStudent(studentId: string): Promise<IMorning[]> {
  const existingMorning = await this.morningModel.find({studentId: `${studentId}`}).exec();
  if (!existingMorning) {
   throw new NotFoundException(`Morning #${studentId} not found`);
  }
  return existingMorning;
}

async getMorningStudate(studentId: string, date: string): Promise<IMorning> {
  const modifiedDate = date.replace(/-/g, '/')
  const existingMorning = await this.morningModel.findOne({studentId: studentId, date: modifiedDate}).exec();
  if (!existingMorning) {
   throw new NotFoundException(`Morning ${studentId} on date ${date} not found`);
  }
  return existingMorning;
}

async deleteMorning(morningId: string): Promise<IMorning> {
    const deletedMorning = await this.morningModel.findByIdAndDelete(morningId);
   if (!deletedMorning) {
     throw new NotFoundException(`Morning #${morningId} not found`);
   }
   return deletedMorning;
}
}