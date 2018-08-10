'use strict';

const mongoose = require('mongoose');
const {
    ObjectId
} = require('mongodb');

const item = mongoose.model('item');


module.exports.getAll = (req, res) => {
    item.find({}).then(data => {
        res.send({
            data: {
                widget: data.recommendation.length,
                reference: {
                    timestamp: new Date().format('m-d-Y'),
                    item: data
                },
                recommendation: data.recommendations
            }
        })
    }).catch(err => {
        res.status(400).send({
            status: 400,
            message: 'Bad Request',
            stack: err
        });
    });
};

module.exports.getAll = (req, res) => {
    if (req.params.businessId) {
        res.status(400).send({
            status: 400,
            message: 'Please send a businessId',
        });
    }
    item.findOne(req.params.businessId).then(data => {
        if (data) {
            res.status(404).send({
                status: 404,
                message: 'Invalid businessId',
            });
        }
        res.send({
            data: {
                widget: data.recommendation.length,
                reference: {
                    timestamp: new Date().format('m-d-Y'),
                    item: data
                },
                recommendation: data.recommendations
            }
        });
    }).catch(err => {
        res.status(400).send({
            status: 400,
            message: 'Bad Request',
            stack: err
        });
    });
};

module.exports.creteAll = (req, res) => {
    if (req.body === '') {
        res.status(400).send({
            status: 400,
            message: 'Please send a data',
        });
    }
    item.create(req.body).then(data => {
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

const data = [{

}];