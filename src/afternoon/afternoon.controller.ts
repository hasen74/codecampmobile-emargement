import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateAfternoonDto } from './dto/create-afternoon.dto';
import { UpdateAfternoonDto } from './dto/update-afternoon.dto';
import { AfternoonService } from './afternoon.service';

@Controller('afternoon')
export class AfternoonController {
   constructor(private readonly afternoonService: AfternoonService) { }
   
@Post()
   async createAfternoon(@Res() response, @Body() createAfternoonDto: CreateAfternoonDto) {
  try {
    const newAfternoon = await this.afternoonService.createAfternoon(createAfternoonDto);
    return response.status(HttpStatus.CREATED).json({
    message: 'Afternoon has been created successfully',
    newAfternoon,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: Afternoon not created!',
    error: 'Bad Request'
 });
 }
}
@Put('/:id')
async updateAfternoon(@Res() response,@Param('id') afternoonId: string,
@Body() updateAfternoonDto: UpdateAfternoonDto) {
  try {
   const existingAfternoon = await this.afternoonService.updateAfternoon(afternoonId, updateAfternoonDto);
  return response.status(HttpStatus.OK).json({
  message: 'Afternoon has been successfully updated',
  existingAfternoon,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}

@Put('/studate/:studentId/:date')
async updateAfternoonStudate(@Res() response,@Param('studentId') studentId: string, @Param('date') date: string,
@Body() updateAfternoonDto: UpdateAfternoonDto) {
  try {
   const existingAfternoon = await this.afternoonService.updateAfternoonStudate(studentId, date, updateAfternoonDto);
  return response.status(HttpStatus.OK).json({
  message: 'Afternoon has been successfully updated',
  existingAfternoon,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}

@Get()
async getAfternoons(@Res() response) {
try {
  const afternoonData = await this.afternoonService.getAllAfternoons();
  return response.status(HttpStatus.OK).json({
  message: 'All afternoons data found successfully',afternoonData,});
 } catch (err) {
  return response.status(err.status).json(err.response);
 }
}

@Get('/:id')
async getAfternoon(@Res() response, @Param('id') afternoonId: string) {
 try {
    const existingAfternoon = await
this.afternoonService.getAfternoon(afternoonId);
    return response.status(HttpStatus.OK).json({
    message: 'Afternoon found successfully',existingAfternoon,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}

@Get('/student/:studentId')
async getAllAfternoonsStudent(@Res() response, @Param('studentId') studentId: string) {
 try {
    const existingAfternoon = await
this.afternoonService.getAllAfternoonsStudent(studentId);
    return response.status(HttpStatus.OK).json({
    message: 'Afternoons found successfully',existingAfternoon,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}

@Get('studate/:studentId/:date')
async getAfternoonStudate(@Res() response, @Param('studentId') studentId: string, @Param('date') date: string) {
 try {
    const existingAfternoon = await this.afternoonService.getAfternoonStudate(studentId, date);
    return response.status(HttpStatus.OK).json({
    message: 'Afternoon found successfully',existingAfternoon,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}

@Delete('/:id')
async deleteAfternoon(@Res() response, @Param('id') afternoonId: string)
{
  try {
    const deletedAfternoon = await this.afternoonService.deleteAfternoon(afternoonId);
    return response.status(HttpStatus.OK).json({
    message: 'Afternoon deleted successfully',
    deletedAfternoon,});
  }catch (err) {
    return response.status(err.status).json(err.response);
  }
 }
}