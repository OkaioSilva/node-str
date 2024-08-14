"use strict";
// 1 - carregando o mongoose e o Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 2 - schema
const schema = new Schema({
    name:{
        type: String,
        required: true
    }, 
    email:{
        type: String,
        required: true
    }, 
    password:{
        type: String,
        required: true
    }, 

})

module.exports = mongoose.model('Customer', schema)