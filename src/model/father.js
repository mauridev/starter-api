import mongoose from 'mongoose';
import Son from './son';
let Schema = mongoose.Schema;

let FatherSchema = new Schema({
  name: {
    type:  String,
    required: true
  },
  age: Number,
  position: {
    type: { type: String, default: 'Point'},
    coordinates: [Number]
  },
  sons: [{
    type: Schema.Types.ObjectId,
    ref: 'Son'
  }]
});



module.exports = mongoose.model('Father', FatherSchema);
