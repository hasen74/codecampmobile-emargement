import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAfternoonDto } from 'src/afternoon/dto/create-afternoon.dto';
import { IAfternoon } from 'src/afternoon/interface/afternoon.interface';
import { Model } from "mongoose";
import { UpdateAfternoonDto } from 'src/afternoon/dto/update-afternoon.dto';

@Injectable()
export class AfternoonService {
constructor(@InjectModel('Afternoon') private afternoonModel:Model<IAfternoon>) { }
async createAfternoon(createAfternoonDto: CreateAfternoonDto): Promise<IAfternoon> {
   const newAfternoon = await new this.afternoonModel(createAfternoonDto);
   return newAfternoon.save();
}
async updateAfternoon(afternoonId: string, updateAfternoonDto: UpdateAfternoonDto): Promise<IAfternoon> {
    const existingAfternoon = await        this.afternoonModel.findByIdAndUpdate(afternoonId, updateAfternoonDto, { new: true });
   if (!existingAfternoon) {
     throw new NotFoundException(`Afternoon #${afternoonId} not found`);
   }
   return existingAfternoon;
}

async updateAfternoonStudate(studentId: string, date: string, updateAfternoonDto: UpdateAfternoonDto): Promise<IAfternoon> {
  const modifiedDate = date.replace(/-/g, '/')
  const existingAfternoon = await this.afternoonModel.findOneAndUpdate({studentId: studentId, date: modifiedDate}, updateAfternoonDto, { new: true });
 if (!existingAfternoon) {
   throw new NotFoundException(`Afternoon ${studentId} on date ${date} not found`);
 }
 return existingAfternoon;
}

async getAllAfternoons(): Promise<IAfternoon[]> {
    const afternoonData = await this.afternoonModel.find();
    if (!afternoonData || afternoonData.length == 0) {
        throw new NotFoundException('Afternoons data not found!');
    }
    return afternoonData;
}

async getAfternoon(afternoonId: string): Promise<IAfternoon> {
   const existingAfternoon = await     this.afternoonModel.findById(afternoonId).exec();
   if (!existingAfternoon) {
    throw new NotFoundException(`Afternoon #${afternoonId} not found`);
   }
   return existingAfternoon;
}

async getAllAfternoonsStudent(studentId: string): Promise<IAfternoon[]> {
  const existingAfternoon = await this.afternoonModel.find({studentId: `${studentId}`}).exec();
  if (!existingAfternoon) {
   throw new NotFoundException(`Afternoon #${studentId} not found`);
  }
  return existingAfternoon;
}

async getAfternoonStudate(studentId: string, date: string): Promise<IAfternoon> {
  const modifiedDate = date.replace(/-/g, '/')
  const existingAfternoon = await this.afternoonModel.findOne({studentId: studentId, date: modifiedDate}).exec();
  if (!existingAfternoon) {
   throw new NotFoundException(`Afternoon ${studentId} on date ${date} not found`);
  }
  return existingAfternoon;
}

async deleteAfternoon(afternoonId: string): Promise<IAfternoon> {
    const deletedAfternoon = await this.afternoonModel.findByIdAndDelete(afternoonId);
   if (!deletedAfternoon) {
     throw new NotFoundException(`Afternoon #${afternoonId} not found`);
   }
   return deletedAfternoon;
}
}