import mongoose, { Schema } from 'mongoose';

const CardSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Card', CardSchema);
