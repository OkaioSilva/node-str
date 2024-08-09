//1 use strict
'use strict';
// 3 - importar o Product de models e mongoose
const mongoose = require('mongoose')
const Product = mongoose.model('Product')

// CRUD:

// 5 listando produtos
exports.get = (req, res, next)=>{
    Product.find({active: true}, 'title price slug').then((data)=>{
        res.status(200).send(data)
    }).catch((e)=>{
        res.status(400).send(e)
    })
}
// 6 listando um produto:
// pelo slug
exports.getBySlug = (req, res, next) =>{
    Product.findOne({slug: req.params.slug, active: true}, 'title description price slug tags').then((data)=>{
    res.status(200).send(data)
}).catch((e)=>{
    res.status(400).send(e)
})
}
// pelo id
exports.getById = (req, res, next) =>{
    Product.findById(req.params.id).then((data)=>{
    res.status(200).send(data)
}).catch((e)=>{
    res.status(400).send(e)
})
}
// pela tag
exports.getByTag = (req, res, next) =>{
    Product.find({tags: req.params.tag, active: true}, 'title description price slug tags').then((data)=>{
    res.status(200).send(data)
}).catch((e)=>{
    res.status(400).send(e)
})
}


//2 - colar a rota created aqui e substituir lá em routes/products.js por esse controller
// exports.post = (req, res, next) => {
//     res.status(201).send(req.body)
// }

// 4 - o código acima mudou e está assim agora:
exports.post = (req, res, next) => {
    let product = new Product(req.body);
    product.save().then(()=>{
        res.status(201).send({
            message: "Produto cadastrado com sucesso"
        })
    }).catch((e)=>{
        res.status(400).send({message: "Falha ao cadastra produto", data: e})
    })
}
// Poderá mudar novamente, assim como os códigos abaixo

// 7 - mudando a atualização:
// exports.put = (req, res, next) => {
//     const id = req.params.id;
//     res.status(201).send({
//         id: id, 
//         item: req.body
//     })
// }
exports.put = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            slug: req.body.slug
        }
   }).then(()=>{
        res.status(200).send({
            message: "Produto atualizado com sucesso!"
        })
   }).catch((e)=>{
        res.status(400).send({
            message: "Falha ao atualizar produto", 
            data: e
        })
   })
}
//8 - mudando o delete:
// exports.delete = (req, res, next) => {
//     res.status(200).send(req.body)
// }
exports.delete = (req, res, next) => {
    Product.findOneAndDelete(req.body.id).then(()=>{
        res.status(200).send({
            message: "Produto removido com sucesso!"
        })
   }).catch((e)=>{
        res.status(400).send({
            message: "Falha ao remover produto", 
            data: e
        })
   })
}
