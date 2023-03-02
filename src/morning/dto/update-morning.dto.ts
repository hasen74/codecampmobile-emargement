import { PartialType } from '@nestjs/mapped-types';
import { CreateMorningDto } from './create-morning.dto';

export class UpdateMorningDto extends PartialType(CreateMorningDto) {}