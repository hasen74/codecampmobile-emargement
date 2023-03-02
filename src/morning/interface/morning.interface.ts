import { Document, ObjectId } from 'mongoose';

export interface IMorning extends Document{
  readonly studentId: {type: ObjectId}
  readonly scanned: boolean;
  readonly status: string;
  readonly date: string;
  readonly signedinAt: string;
  readonly document: string;
}