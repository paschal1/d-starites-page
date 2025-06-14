import mongoose, {
  Schema,
  model,
  models,
  Document,
  Model,
  Types,
} from 'mongoose';

export interface IReply {
  to: string;
  subject: string;
  message: string;
  sentAt?: Date;
  messageId: Types.ObjectId;
}

// The document that includes Mongoose fields (_id, etc.)
export interface IReplyDocument extends IReply, Document {}

const ReplySchema = new Schema<IReplyDocument>(
  {
    to: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
    messageId: { type: Schema.Types.ObjectId, ref: 'Contact', required: true },
  },
  { timestamps: true }
);


export const Reply: Model<IReplyDocument> =
  models.Reply || model<IReplyDocument>('Reply', ReplySchema);
