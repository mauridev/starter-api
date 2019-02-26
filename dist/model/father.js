'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _son = require('./son');

var _son2 = _interopRequireDefault(_son);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var FatherSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  position: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  sons: [{
    typer: Schema.Types.ObjectId,
    ref: 'Son'
  }]
});

module.exports = _mongoose2.default.model('Father', FatherSchema);
//# sourceMappingURL=father.js.map