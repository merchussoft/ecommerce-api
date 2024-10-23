const route = require('express').Router();
const { uploadProducts } = require('../Controllers/Products-ci')
const upload = require('../Config/Multer-config');


route.get('/views_products', (req, res) => {
    res.status(200).json({message: 'hola desde aqui'})
})

route.post('/upload_products', upload.single('img_product'), uploadProducts)



module.exports = route;