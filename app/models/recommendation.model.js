'use strict';

import mongoose from 'mongoose';

const recommendationSchema = mongoose.Schema({
    businessId: {
        type: String,
        unique: true,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    imageName: {
        type: String,
        require: true

    },
    detailUrl: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    oldPrice: {
        type: String,
        require: true
    },
    productInfo: {
        paymentConditions: {
            type: String,
            require: true
        }
    }
});

mongoose.module('recommendation', recommendationSchema);