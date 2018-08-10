'use strict';
const mongoose = require('mongoose');
const item_data = require('./../config/json.config');
const {
    ObjectId
} = require('mongodb');

const item = mongoose.model('item');


module.exports.getAll = (req, res) => {
    item.find({}).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(400).send({
            status: 400,
            message: 'Bad Request',
            stack: err
        });
    });
};

module.exports.getById = (req, res) => {
    let businessId = req.params.businessId;
    if (businessId === undefined) {
        return res.status(400).send({
            status: 400,
            message: 'Please send a businessId',
        });
    }
    item.findOne({businessId: businessId}).then(item => {
        if (!item) {
            return res.status(404).send({
                status: 404,
                message: 'Invalid businessId',
            });
        }
        res.send({
            data: {
                widget: item.recommendations.length,
                reference: {
                    timestamp: (new Date()).toISOString().replace(/-/g, '-').split('T')[0],
                    item: {
                        businessId: item.businessId,
                        name: item.name,
                        imageName: item.imageName,
                        detailUrl: item.detailUrl,
                        price: item.price,
                        oldPrice: item.oldPrice,
                        productInfo : {
                            paymentConditions: item.productInfo.paymentConditions
                        }
                    }
                },
                recommendation: item.recommendations
            }
        });
    }).catch(err => {
        return res.status(400).send({
            status: 400,
            message: 'Bad Request',
            stack: err
        });
    });
};



module.exports.creteAll = (req, res) => {
    item.create(item_data.item).then(data => {
        res.send({
            data
        });
    }).catch(err => {
        res.status(400).send({
            status: 400,
            message: 'Bad Request',
            stack: err
        });
    });
};