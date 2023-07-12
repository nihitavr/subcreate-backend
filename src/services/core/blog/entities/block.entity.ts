import { BlockTuneData } from '@editorjs/editorjs/types/block-tunes/block-tune-data';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseEntity } from 'src/services/common/entities/base-entity';

export const SchemaToJson = {
  virtuals: true,
  transform(doc, returnObject) {
    returnObject.blogId = returnObject._id;
    delete returnObject._id;
    delete returnObject.__v;
  },
};

@Schema({ timestamps: true })
export class Block extends BaseEntity {
  @Prop({ required: true })
  blogId: string;
  /**
   * Tool type
   */
  @Prop({ required: true })
  type: string;
  /**
   * Saved Block data
   */
  @Prop({ required: true, type: Object })
  data: any;

  /**
   * Block Tunes data
   */
  @Prop({ type: Object })
  tunes?: { [name: string]: BlockTuneData };
}

export type BlockDoc = HydratedDocument<Block>;

export const BlockSchema = SchemaFactory.createForClass(Block);
BlockSchema.set('toJSON', SchemaToJson);
