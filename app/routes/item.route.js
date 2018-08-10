'use strict'

module.exports = app => {

    const controller = require('./../controllers/item.controller');

    app.route('/v1/endpoints')
        .post(controller.creteAll);

    app.route('/v1/items')
        .get(controller.getAll);

    app.route('/v1/items/:businessId')
        .get(controller.getById);


};