const { createPathEnv, nodeEnv } = require('./src/App/Config/Config');

require('dotenv').config({
	path: createPathEnv(nodeEnv())
})


const app = require('./src/app');
const fs = require('fs');
const path = require('path');

const route_path = path.join(__dirname, 'src', 'App', 'Routes');


/**
 * Aqui llamamos la rutas de forma automaticay se estable la ruta /ruta
 * dependiendo del nombre del archivo.
*/

fs.readdirSync(route_path).forEach((file) => {
    if(file.endsWith('.js')) {
        const route = require(path.join(route_path, file));
        const route_name = file.replace('.js', '');
        app.use(`/${route_name}`, route);
    }
})

app.listen(app.get('port'), () => console.log(`SERVER RUNNING IN PORT ${app.get('port')}`));
