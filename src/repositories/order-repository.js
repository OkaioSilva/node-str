'use strict'
//1 - carregando módulos
const mongoose = require('mongoose')
const Order = mongoose.model('Order')


exports.get = async()=>{
    const res = await Order.find({}, 'number status customer items').populate('customer', 'name').populate('items.product', 'title')
    return res
}

exports.create = async(data)=>{
    let order = new Order(data);
    await order.save()
}