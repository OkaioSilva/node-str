//1 use strict
"use strict";
// 3 - importar o Product de models e mongoose

// const mongoose = require("mongoose");
// const Product = mongoose.model("Product"); comentando pois não precisamos mais deles, uma vez que já estão no repositories

// 9 - importanto o fluent-validator
const ValidationContract = require("../validators/fluent-validator");
//10 - repository
const repository = require("../repositories/product-repository");

//14 - azure-storage
const azure = require('azure-storage')
const config = require('../config');
const guid = require("guid");

// CRUD:

// 5 listando produtos
// exports.get = (req, res, next)=>{
//     //11 - substituindo o Product.find
//     // Product.find({active: true}, 'title price slug')
//     repository.get().then((data)=>{
//         res.status(200).send(data)
//     }).catch((e)=>{
//         res.status(400).send(e)
//     })
// }

// 6 listando um produto:
// pelo slug
// exports.getBySlug = (req, res, next) =>{
//     // 12 - substituindo o Product.findOne
//     // Product.findOne({slug: req.params.slug, active: true}, 'title description price slug tags')
//     repository.getBySlug(req.params.slug).then((data)=>{
//     res.status(200).send(data)
// }).catch((e)=>{
//     res.status(400).send(e)
// })
// }
// // pelo id
// exports.getById = (req, res, next) =>{
//     // Product.findById(req.params.id)
//     repository.getById(req.params.id).then((data)=>{
//     res.status(200).send(data)
// }).catch((e)=>{
//     res.status(400).send(e)
// })
// }
// // pela tag
// exports.getByTag = (req, res, next) =>{
//     // Product.find({tags: req.params.tag, active: true}, 'title description price slug tags')
//     repository.getByTag(req.params.tag).then((data)=>{
//     res.status(200).send(data)
// }).catch((e)=>{
//     res.status(400).send(e)
// })
// }

//2 - colar a rota created aqui e substituir lá em routes/products.js por esse controller
// exports.post = (req, res, next) => {
//     res.status(201).send(req.body)
// }

// 4 - o código acima mudou e está assim agora:
// exports.post = (req, res, next) => {
//     // 10 - inicializando as validações do fluent-validator
//     let contract = new ValidationContract();
//     contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres')
//     contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres')
//     contract.hasMinLen(req.body.description , 3, 'A descrição deve conter pelo menos 3 caracteres')

//         //11 - Se os dados forem inválidos:
//         if(!contract.isValid()){
//             res.status(400).send(contract.errors()).end();
//             return;
//         }

//     // let product = new Product(req.body);
//     // product.save()
//     repository.create(req.body).then(()=>{
//         res.status(201).send({
//             message: "Produto cadastrado com sucesso"
//         })
//     }).catch((e)=>{
//         res.status(400).send({message: "Falha ao cadastra produto", data: e})
//     })
// }
// Poderá mudar novamente, assim como os códigos abaixo

// 7 - mudando a atualização:
// exports.put = (req, res, next) => {
//     const id = req.params.id;
//     res.status(201).send({
//         id: id,
//         item: req.body
//     })
// }
// exports.put = (req, res, next) => {
// //     Product.findByIdAndUpdate(req.params.id, {
// //         $set: {
// //             title: req.body.title,
// //             description: req.body.description,
// //             price: req.body.price,
// //             slug: req.body.slug
// //         }
// //    })

// repository.update(req.params.id, req.body).then(()=>{
//         res.status(200).send({
//             message: "Produto atualizado com sucesso!"
//         })
//    }).catch((e)=>{
//         res.status(400).send({
//             message: "Falha ao atualizar produto",
//             data: e
//         })
//    })
// }
//8 - mudando o delete:
// exports.delete = (req, res, next) => {
//     res.status(200).send(req.body)
// }
// exports.delete = (req, res, next) => {
//   // Product.findOneAndDelete(req.body.id)
//   repository
//     .delete(req.body.id)
//     .then(() => {
//       res.status(200).send({
//         message: "Produto removido com sucesso!",
//       });
//     })
//     .catch((e) => {
//       res.status(400).send({
//         message: "Falha ao remover produto",
//         data: e,
//       });
//     });
// };

//13 mudando os métodos para async/await:
// -listando
exports.get = async (req, res, next) => {
  try {
    let data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição",
    });
  }
};
// slug
exports.getBySlug = async (req, res, next) => {
  try {
    let data = await repository.getBySlug(req.params.slug);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição",
    });
  }
};

// pelo id
exports.getById = async (req, res, next) => {
  try {
    let data = await repository.getById(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição" + e,
    });
  }
};
// pela tag
exports.getByTag = async (req, res, next) => {
  try {
    const data = await repository.getByTag(req.params.tag);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição" + e,
    });
  }
};

//post
exports.post = async (req, res, next) => {
  // 10 - inicializando as validações do fluent-validator
  let contract = new ValidationContract();
  contract.hasMinLen(
    req.body.title,
    3,
    "O título deve conter pelo menos 3 caracteres"
  );
  contract.hasMinLen(
    req.body.slug,
    3,
    "O slug deve conter pelo menos 3 caracteres"
  );
  contract.hasMinLen(
    req.body.description,
    3,
    "A descrição deve conter pelo menos 3 caracteres"
  );

  //11 - Se os dados forem inválidos:
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
     //15 - azure
    const blobSvc = azure.createBlobService(config.containerConnectionString)

    let filename = guid.raw().toString() + '.jpg';
    let rawdata = req.body.image;
    let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let type = matches[1];
    let buffer = new Buffer.from(matches[2], 'base64');

    // salva a imagem   
    blobSvc.createBlockBlobFromText('product-images', filename, buffer, {
      contentType: type
    }, function(error, result, response){
      if(error){
          filename = 'default-product.png'
      }
    })
    await repository.create({
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description ,
      price: req.body.price,
      active: true,
      tags: req.body.tags,
      image: 'https://nodeestr.blob.core.windows.net/product-images/node.webp' + filename
    })
    res.status(201).send({
      message: "Produto cadastrado com sucesso",
    });
  } catch (e) {
    console.log(e)
    res.status(500).send({
      message: "Falha ao processar sua requisição" + e,
    });
  }
};

// put
exports.put = async(req, res, next) => {

    await repository.update(req.params.id, req.body);
    try{      
      
      res.status(200).send({
        message: "Produto atualizado com sucesso!",
      });
    } catch (e) {
        res.status(500).send({
          message: "Falha ao processar sua requisição" + e,
        });
      }
};

//delete
exports.delete = async(req, res, next) => {
    try{
        await repository.delete(req.body.id);
        res.status(200).send({
            message: "Produto removido com sucesso!",
        });
    }catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição" + e,
        });
    }
};
