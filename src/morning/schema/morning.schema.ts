import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Morning {
   @Prop()
   studentId: string
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
export const MorningSchema = SchemaFactory.createForClass(Morning);