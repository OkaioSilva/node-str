"use strict";
// 1 - carregando o mongoose e o Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 2 - schema
const schema = new Schema({
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    number:{
        type: String,
        required: true
    },
    createDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    status:{
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created'
    }, 
    items:[{
        quantity:{
            type: Number,
            required: true,
            default: 1
        },
        price:{
            type: Number,
            required: true
        },
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }] 

})

module.exports = mongoose.model('Order', schema)