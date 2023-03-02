import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentSchema } from './student/schema/student.schema';
import { MorningSchema } from './morning/schema/morning.schema';
import { AfternoonSchema } from './afternoon/schema/afternoon.schema';
import { AfternoonController } from './afternoon/afternoon.controller';
import { AfternoonService } from './afternoon/afternoon.service';
import { MorningController } from './morning/morning.controller';
import { MorningService } from './morning/morning.service';
import { StudentController } from './student/student.controller';
import { StudentService } from './student/student.service';
import { AfternoonSeedService } from './seed/afternoonSeeder';
import { StudentSeedService } from './seed/studentSeeder';
import { MorningSeedService } from './seed/morningSeeder';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@defietna.u243ecv.mongodb.net/?retryWrites=true&w=majority', {dbname: 'defietna'}),
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
    MongooseModule.forFeature([{ name: 'Morning', schema: MorningSchema }]),
    MongooseModule.forFeature([{ name: 'Afternoon', schema: AfternoonSchema }]),
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [AppController,StudentController, MorningController, AfternoonController],
  providers: [AppService, StudentService, MorningService, AfternoonService, AfternoonSeedService, StudentSeedService, MorningSeedService],
})
export class AppModule {}
