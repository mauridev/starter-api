'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _father = require('./father');

var _father2 = _interopRequireDefault(_father);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var SonSchema = new Schema({
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

module.exports = _mongoose2.default.model('Son', SonSchema);
//# sourceMappingURL=son.js.map