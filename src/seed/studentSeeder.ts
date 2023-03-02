import { promosAPAE, promosAPE } from './studentsFromETNAAPI';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IStudent } from 'src/student/interface/student.interface'


const seedDataAPE = [];
const seedDataAPAE = []

const APEData = async () => {
  const APE = await promosAPE();
  for (let i = 0; i < APE.length; i++) {
      seedDataAPE.push({
        login: APE[i].login,
        fcmToken: '',
        password: '',
      });
    }
};

const APAEData = async () => {
  const APAE = await promosAPAE();
  for (let i = 0; i < APAE.length; i++) {
      seedDataAPAE.push({
        login: APAE[i].login,
        fcmToken: '',
        password: '',
      });
    }
};

@Injectable()
export class StudentSeedService {
  constructor(@InjectModel('Student') private studentModel: Model<IStudent>) {}

  async seedData() {
    try {
      await APEData()
      await APAEData()
      await this.studentModel.deleteMany({})
      await this.studentModel.insertMany(seedDataAPE);
      await this.studentModel.insertMany(seedDataAPAE);
      console.log('Student data seeding successful');
    } catch (err) {
      console.error('Student data seeding failed', err);
    }
  }
}


