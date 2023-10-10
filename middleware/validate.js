const validator = require('../helpers/validate');

const validateCard = async (req, res, next) => {
    const collection = req.params.collection;
    let validationRule = {};
    if (collection === 'action') {
        validationRule = {
            "name": "required|string",
            "cost": "required|integer",
            "quantity": "required|integer",
            "image": "required|string",
            "type": "required|array"
        };
    } else if (collection === 'victory' || collection === 'treasure') {
        validationRule = {
            "name": "required|string",
            "cost": "required|integer",
            "type": "required|string",
            "value": "required|integer",
            "quantity": "required|integer",
            "image": "required|string"
        };
    }
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}
module.exports = { validateCard }