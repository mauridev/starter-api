import mongoose from 'mongoose';
import { Router } from 'express';
import Father from '../model/father';
import Son from '../model/son';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db}) => {
  let api = Router();

  //CRUD - Create Read Update Delete Operations

  // '/v1/father/add' -Create
  api.post('/add', (req, res) => {
    let newFather = new Father();
    newFather.name = req.body.name;
    newFather.age = req.body.age;
    newFather.position.coordinates = req.body.position.coordinates;

    newFather.save(err => {
      if(err) {
        res.send(err);
      }
      res.json({ message: 'Father saved successfully' });
    });
  });

  // '/v1/father' - Read
  api.get('/' , (req, res) => {
    Father.find({}, (err, fathers) => {
      if (err) {
        res.send(err);
      }
      res.json(fathers)
    });
  });

  // 'v1/father/:id' - Read 1
  api.get('/:id', (req, res) => {
    Father.findById(req.params.id, (err, father) => {
      if(err) {
        res.send(err);
      }
      res.json(father);
    });
  });


  //'v1/father/:id' -Update
  api.put('/:id', (req, res) => {
    Father.findById(req.params.id, (err, father) =>{
      if (err) {
        res.send(err);
      }
      father.name = req.body.name;
      father.save( err => {
        if(err) {
          res.send(err);
        }
        res.json({ message: "Father info updated" });
      });
    });
  });

  //'v1/father/:id' -- Delete
  api.delete('/:id', (req, res) => {
    Father.deleteOne({
      _id: req.params.id
    }, (err, father) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Father successfully Removed!"});
    });
  });

  //add son for a specifc father id
  // '/v1/father/sons/add/:id'
  api.post('/sons/add/:id', (req, res) => {
    Father.findById(req.params.id, (err, father) => {
      if(err) {
        res.send(err);
      }

      let newSon = new Son();
      newSon.name = req.body.name;
      newSon.father = father._id;

      newSon.save((err, son) => {
        if(err) {
          res.send(err);
        }
      father.sons.push(newSon);
      father.save((err, father) => {
        if(err) {
          res.send(err);
        }
        res.json({ message: 'Son is created and related with a father saved!'});
      });
    });
  });
});



  return api;
}
