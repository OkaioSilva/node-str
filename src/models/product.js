"use strict";
// 1 - carregando o mongoose e o Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 2 - schema
const schema = new Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    slug:{
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    active:{
        type: Boolean,
        required: true,
        default: true
    },
    tags:[{
        type: String,
        required: true
    }]
})

module.exports = mongoose.model('Product', schema)