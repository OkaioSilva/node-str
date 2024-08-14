'use strict'
//1 - carregando módulos
const mongoose = require('mongoose')
const Product = mongoose.model('Product')

//2 - expotando métodos get 
// exports.get = () =>{
//     return Product.find({active: true}, 'title price slug');
// }

// exports.getBySlug = (slug) =>{
//     return Product.findOne({
//         slug: slug,
//         active: true},
//         'title description price slug tags');
// }
// exports.getById = (id) =>{
//     return Product.findById(id);
// }

// exports.getByTag = (tag) =>{
//     return  Product.find({tags: tag, active: true}, 'title description price slug tags')
// }

// // post
// exports.create = (data)=>{
//     let product = new Product(data);
//     return product.save()
// }

// // put
// exports.update = (id, data)=>{
//     return Product.findByIdAndUpdate(id, {
//         $set: {
//             title: data.title,
//             description: data.description,
//             price: data.price,
//             slug: data.slug
//         }
//    })
// }

// //delete
// exports.delete = (id) =>{
//     return Product.findOneAndDelete(id)
// }

// 3 todos os métodos acima serão mudados para async/await

exports.get = async()=>{
    const res = await Product.find({
        active: true}, 
        'title price slug')
        return res
}

exports.getBySlug = async(slug) =>{
        const res = await Product.findOne({
            slug: slug,
            active: true},
            'title description price slug tags');
        return res;
}


exports.getById = async(id) =>{
    const res = await Product.findById(id);
    return res;
}

exports.getByTag = async(tag) =>{
    const res = await Product.find({
        tags: tag,
        active: true}, 
        'title description price slug tags')
    return res;
}

// // post
exports.create = async(data)=>{
    let product = new Product(data);
    await product.save()
}

// // put
exports.update = async(id, data)=>{
    await Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
    })
}

// //delete
exports.delete = async(id) =>{
    await Product.findOneAndDelete(id)
}