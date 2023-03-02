import { promosAPAE, promosAPE } from './studentsFromETNAAPI';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IAfternoon } from 'src/afternoon/interface/afternoon.interface'

const daysInYear = 365;
const year = 2023;

const seedDataAPE = [];
const seedDataAPAE = []

const APEData = async () => {
  const APE = await promosAPE();
  for (let i = 0; i < APE.length; i++) {
    for (let j = 0; j < daysInYear; j++) {
      const dayOfYear = j + 1;
      const dateString = `${year}-01-01T00:00:00.000Z`; // set the date to Jan 1st of the year
      const date = new Date(dateString);
      date.setDate(dayOfYear);

      seedDataAPE.push({
        studentId: APE[i].login,
        scanned: false,
        status: 'Absent',
        date: date.toLocaleDateString(),
        signedinAt: '',
        document: '',
      });
    }
  }
};

const APAEData = async () => {
  const APAE = await promosAPAE();
  for (let i = 0; i < APAE.length; i++) {
    for (let j = 0; j < daysInYear; j++) {
      const dayOfYear = j + 1;
      const dateString = `${year}-01-01T00:00:00.000Z`; // set the date to Jan 1st of the year
      const date = new Date(dateString);
      date.setDate(dayOfYear);

      seedDataAPAE.push({
        studentId: APAE[i].login,
        scanned: false,
        status: 'Absent',
        signedinAt: '',
        date: date.toLocaleDateString(),
        document: '',
      });
    }
  }
};

@Injectable()
export class AfternoonSeedService {
  constructor(@InjectModel('Afternoon') private afternoonModel: Model<IAfternoon>) {}

  async seedData() {
    try {
      await APEData()
      await APAEData()
      await this.afternoonModel.deleteMany({})
      await this.afternoonModel.insertMany(seedDataAPE);
      await this.afternoonModel.insertMany(seedDataAPAE);
      console.log('Afternoon data seeding successful');
    } catch (err) {
      console.error('Afternoon data seeding failed', err);
    }
  }
}


