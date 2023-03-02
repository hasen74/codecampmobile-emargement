import { PartialType } from '@nestjs/mapped-types';
import { CreateAfternoonDto } from './create-afternoon.dto';

export class UpdateAfternoonDto extends PartialType(CreateAfternoonDto) {}