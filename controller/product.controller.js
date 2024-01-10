function createProduct(req,res){
    res.send({method: req.methon, url:req.originalUrl })
}
function findAllProduct(req,res){
    res.send({method: req.methon, url:req.originalUrl })
}
function findByProduct(req,res){
    res.send({method: req.methon, url:req.originalUrl })
}
function updateProduct(req,res){
    res.send({method: req.methon, url:req.originalUrl })
}
function deleteProduct(req,res){
    res.send({method: req.methon, url:req.originalUrl })
}
module.exports = {
    createProduct,
    findAllProduct,
    findByProduct,
    updateProduct,
    deleteProduct,
}