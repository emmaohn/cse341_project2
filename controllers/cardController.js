// const { response } = require('express');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const agg = [
    {
      '$unionWith': {
        'coll': 'victory_cards', 
        'pipeline': [
          {
            '$project': {
              '_id': 0
            }
          }
        ]
      }
    }, {
      '$unionWith': {
        'coll': 'action_cards', 
        'pipeline': [
          {
            '$project': {
              '_id': 0
            }
          }
        ]
      }
    }
  ];
  
  const cards = mongodb.getDatabase().db().collection('treasure_cards');
  cards.aggregate(agg)
  const cursor = cards.aggregate(agg);
  const result = await cursor.toArray();
  res.setHeader('content-type', 'application/json');
  res.status(200).json(result);
};

const getSingle = async (req, res) => {
  const collection = req.params.collection;
  const cardId = new ObjectId(req.params.id);

  const result = await mongodb.getDatabase().db().collection(collection + '_cards').find({ _id: cardId });
  result.toArray().then((cards) => {
    res.setHeader('content-type', 'application/json');
    res.status(200).json(cards[0]);
  })
};

const getCollection = async (req, res) => {
  const collection = req.params.collection;
  const result = await mongodb.getDatabase().db().collection(collection+ '_cards').find();
  const cards = await result.toArray();
  res.setHeader('content-type', 'application/json');
  res.status(200).json(cards);
};

const createCard = async (req, res) => {
  const collection = req.params.collection;
  let newCard = {};
  if (collection === 'action') {
    newCard = {
      name: req.body.name,
      cost: req.body.cost,
      type: req.body.type,
      quantity: req.body.quantity,
      image: req.body.image
    }
  } else if (collection === 'treasure' || collection === 'victory') {
    newCard = {
      name: req.body.name,
      cost: req.body.cost,
      type: req.body.type,
      value: req.body.value, 
      quantity: req.body.quantity,
      image: req.body.image
    }
  }

  const response = await mongodb.getDatabase().db().collection(collection + '_cards').insertOne(newCard);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateCard = async (req, res) => {
  const collection = req.params.collection;
  const cardId = new ObjectId(req.params.id);
  let card = {};
  // be aware of updateOne if you only want to update specific fields
  if (collection === 'action') {
    card = {
      name: req.body.name,
      cost: req.body.cost,
      type: req.body.type,
      quantity: req.body.quantity,
      image: req.body.image
    }
  } else if (collection === 'treasure' || collection === 'victory') {
    card = {
      name: req.body.name,
      cost: req.body.cost,
      type: req.body.type,
      value: req.body.value,
      quantity: req.body.quantity,
      image: req.body.image
    }
  }

  const response = await mongodb.getDatabase().db().collection(collection + '_cards').replaceOne({ _id: cardId }, card);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteCard = async (req, res) => {
  const collection = req.params.collection;
  const cardId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection(collection + '_cards').deleteOne({ _id: cardId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = { 
  getAll, 
  getSingle,
  getCollection,
  createCard,
  updateCard, 
  deleteCard 
};
