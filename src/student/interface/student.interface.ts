import { Document } from 'mongoose';

export interface IStudent extends Document{
  readonly login: string;
  readonly fcmToken: string;
  readonly password: object;
}