//1 use strict
'use strict';

// colar a rota created aqui e substituir lá em rotas por esse controller
exports.post = (req, res, next) => {
    res.status(201).send(req.body)
}
exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(201).send({
        id: id, 
        item: req.body
    })
}
exports.delete = (req, res, next) => {
    res.status(200).send(req.body)
}