'use strict'

module.exports = app => {

    const controller = require('./../controllers/web.controller');

    app.route('/')
        .get(controller.page);
};