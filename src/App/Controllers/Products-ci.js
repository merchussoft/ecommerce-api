const { insertTable } = require('../Config/PgConex-config');

const uploadProducts = async (req, res) => {
   const { nombre, descripcion, precio } = req.body;
   const fullHost = `${req.protocol}://${req.hostname}:${req.socket.localPort}`;
   const fotoPath = req.file ? `${fullHost}/uploads/${req.file.filename}` : null; // Ruta de la foto subida

   try {
    if(fotoPath) {
        const {code , data:{ cod_producto}} = await insertTable('productos', { nombre, descripcion, precio });
        if(code === 200 && cod_producto){
            await insertTable('fotos_productos', {cod_producto, foto: fotoPath});
            res.status(code).json({ code, message: 'Producto guardado exitosamente' });
        } else {
            res.json({ code: 406, message: 'Error al guardar el producto'});
        }
    }
   } catch (err) {
    res.status(404).json({ error: err.message });
   }
}




module.exports = {
    uploadProducts
}