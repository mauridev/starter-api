'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _father = require('../model/father');

var _father2 = _interopRequireDefault(_father);

var _son = require('../model/son');

var _son2 = _interopRequireDefault(_son);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  //CRUD - Create Read Update Delete Operations

  // '/v1/father/add' -Create
  api.post('/add', function (req, res) {
    var newFather = new _father2.default();
    newFather.name = req.body.name;
    newFather.age = req.body.age;
    newFather.position.coordinates = req.body.position.coordinates;

    newFather.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Father saved successfully' });
    });
  });

  // '/v1/father' - Read
  api.get('/', function (req, res) {
    _father2.default.find({}, function (err, fathers) {
      if (err) {
        res.send(err);
      }
      res.json(fathers);
    });
  });

  // 'v1/father/:id' - Read 1
  api.get('/:id', function (req, res) {
    _father2.default.findById(req.params.id, function (err, father) {
      if (err) {
        res.send(err);
      }
      res.json(father);
    });
  });

  //'v1/father/:id' -Update
  api.put('/:id', function (req, res) {
    _father2.default.findById(req.params.id, function (err, father) {
      if (err) {
        res.send(err);
      }
      father.name = req.body.name;
      father.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Father info updated" });
      });
    });
  });

  //'v1/father/:id' -- Delete
  api.delete('/:id', function (req, res) {
    _father2.default.deleteOne({
      _id: req.params.id
    }, function (err, father) {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Father successfully Removed!" });
    });
  });

  //add son for a specifc father id
  // '/v1/father/sons/add/:id'
  api.post('/sons/add/:id', function (req, res) {
    _father2.default.findById(req.params.id, function (err, father) {
      if (err) {
        res.send(err);
      }

      var newSon = new _son2.default();
      newSon.name = req.body.name;
      newSon.father = father._id;

      newSon.save(function (err, son) {
        if (err) {
          res.send(err);
        }
        father.sons.push(newSon);
        father.save(function (err, father) {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'Son is created and related with a father saved!' });
        });
      });
    });
  });

  return api;
};
//# sourceMappingURL=father.js.map