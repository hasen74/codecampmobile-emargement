import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Student {
   @Prop()
   login: string;
   @Prop()
   fcmToken: string;
   @Prop()
   password: string;
}
export const StudentSchema = SchemaFactory.createForClass(Student);