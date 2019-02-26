import mongoose from 'mongoose';
import father from './father';

let Schema = mongoose.Schema;

let SonSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  father: {
    type: Schema.Types.ObjectId,
    ref: 'Father',
    required: true
  }
});


module.exports = mongoose.model('Son', SonSchema);