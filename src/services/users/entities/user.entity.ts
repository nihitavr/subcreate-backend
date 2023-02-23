import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseEntity } from 'src/lib/entities/base-entity';
import { SchemaToJson } from 'src/lib/utils/mongo.utils';

export type UserDoc = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends BaseEntity {
  @Prop({ required: true })
  uid: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  username: string;

  @Prop()
  photoURL: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ uid: 1 }, { unique: true });
UserSchema.set('toJSON', SchemaToJson);
