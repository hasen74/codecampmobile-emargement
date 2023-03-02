import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateMorningDto } from './dto/create-morning.dto';
import { UpdateMorningDto } from './dto/update-morning.dto';
import { MorningService } from './morning.service';

@Controller('morning')
export class MorningController {
   constructor(private readonly morningService: MorningService) { }

@Post()
   async createMorning(@Res() response, @Body() createMorningDto: CreateMorningDto) {
  try {
    const newMorning = await this.morningService.createMorning(createMorningDto);
    return response.status(HttpStatus.CREATED).json({
    message: 'Morning has been created successfully',
    newMorning,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: Morning not created!',
    error: 'Bad Request'
 });
 }
}

@Put('/:id')
async updateMorning(@Res() response,@Param('id') morningId: string,
@Body() updateMorningDto: UpdateMorningDto) {
  try {
   const existingMorning = await this.morningService.updateMorning(morningId, updateMorningDto);
  return response.status(HttpStatus.OK).json({
  message: 'Morning has been successfully updated',
  existingMorning,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}

@Put('/studate/:studentId/:date')
async updateMorningStudate(@Res() response,@Param('studentId') studentId: string, @Param('date') date: string,
@Body() updateMorningDto: UpdateMorningDto) {
  try {
   const existingMorning = await this.morningService.updateMorningStudate(studentId, date, updateMorningDto);
  return response.status(HttpStatus.OK).json({
  message: 'Morning has been successfully updated',
  existingMorning,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}

@Get()
async getMornings(@Res() response) {
try {
  const morningData = await this.morningService.getAllMornings();
  return response.status(HttpStatus.OK).json({
  message: 'All mornings data found successfully',morningData,});
 } catch (err) {
  return response.status(err.status).json(err.response);
 }
}

@Get('/:id')
async getMorning(@Res() response, @Param('id') morningId: string) {
 try {
    const existingMorning = await
this.morningService.getMorning(morningId);
    return response.status(HttpStatus.OK).json({
    message: 'Morning found successfully',existingMorning,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}

@Get('/student/:studentId')
async getAllMorningsStudent(@Res() response, @Param('studentId') studentId: string) {
 try {
    const existingMorning = await
this.morningService.getAllMorningsStudent(studentId);
    return response.status(HttpStatus.OK).json({
    message: 'Mornings found successfully',existingMorning,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}

@Get('studate/:studentId/:date')
async getMorningStudate(@Res() response, @Param('studentId') studentId: string, @Param('date') date: string) {
 try {
    const existingMorning = await this.morningService.getMorningStudate(studentId, date);
    return response.status(HttpStatus.OK).json({
    message: 'Morning found successfully',existingMorning,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}

@Delete('/:id')
async deleteMorning(@Res() response, @Param('id') morningId: string)
{
  try {
    const deletedMorning = await this.morningService.deleteMorning(morningId);
    return response.status(HttpStatus.OK).json({
    message: 'Morning deleted successfully',
    deletedMorning,});
  }catch (err) {
    return response.status(err.status).json(err.response);
  }
 }
}