const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController')
const validate = require("../middleware/validate");
const auth = require('../middleware/authenticate.js')

router.get('/', cardController.getAll);

router.get('/:collection', cardController.getCollection);

// collection == action, treasure, victory
router.get('/:collection/:id', cardController.getSingle);

router.post('/:collection', auth.isAuthenticated, validate.validateCard, cardController.createCard);

router.put('/:collection/:id', auth.isAuthenticated, validate.validateCard, cardController.updateCard);

router.delete('/:collection/:id', auth.isAuthenticated, cardController.deleteCard);
 
module.exports = router;