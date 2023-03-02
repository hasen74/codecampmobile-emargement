import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Afternoon {
   @Prop()
   studentId: string;
   @Prop()
   scanned: boolean;
   @Prop()
   status: string;
   @Prop()
   date: string;
   @Prop()
   signedinAt: string;
   @Prop()
   document: string;
}
export const AfternoonSchema = SchemaFactory.createForClass(Afternoon);