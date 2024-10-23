const { Pool } = require('pg');
const { pgConfig } = require('./Config'); 

const pool = new Pool(pgConfig());

// Funcion para ejecutar las consultas
const resultQueryPromise = async (sql, data=[]) => {
    let client = null;

    try {
        client = await pool.connect();
        const res = await client.query(sql, data);
        return { code: 200, data: res.rows }
    } catch (err) {
        console.error('Error al realizar el query: ', err);
        return { code: 404, data: {}, message: err.message, sql: err.sql || sql}        
    } finally {
        if(client) {
            client.release();
            console.log('Conexion Cerrada... ');
        }
    }
}

// Función para obtener datos
const obtieneDatos = async (data) => {
    let campos = ('lista_campos' in data) ? data.lista_campos.toString() : '*';
    let adicional = ('str_adicional' in data) ? data.str_adicional : '';
    let campo = ('campo' in data) ? data.campo : 1;
    let valor = ('valor' in data) ? data.valor : 1;
    let sql = `SELECT ${campos}
               FROM ${data.table}
               WHERE ${campo} = $1 ${adicional}`;
    return await resultQueryPromise(sql, [valor]);
}


// Función para insertar datos
const insertTable = async (table, data = {}) => {
    let campos = Object.keys(data).toString();
    let values_insert = Object.values(data);
    let placeholders = values_insert.map((_, i) => `$${i + 1}`).toString();  // Crear placeholders para parámetros

    let sql_insert = `INSERT INTO ${table} (${campos}) VALUES (${placeholders}) RETURNING *;`;
    let result_insert = await resultQueryPromise(sql_insert, values_insert);

    let error_data = { code: result_insert.code, data:  result_insert.data[0] };
    if (result_insert.code === 404) error_data = result_insert;
    return error_data;
}

module.exports = {
    resultQueryPromise,
    obtieneDatos,
    insertTable
}