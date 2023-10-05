const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController')
const validate = require("../middleware/validate");

router.get('/', cardController.getAll);

router.get('/:collection', cardController.getCollection);

// collection == action, treasure, victory
router.get('/:collection/:id', cardController.getSingle);

router.post('/:collection', validate.validateCard, cardController.createCard);

router.put('/:collection/:id', validate.validateCard, cardController.updateCard);

router.delete('/:collection/:id', cardController.deleteCard);
 
module.exports = router;