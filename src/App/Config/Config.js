const getEnvironment = (k) => {
    return process.env[k];
}

const getNumberEnv = (k=3000) => {
    return Number(getEnvironment(k));
}

const nodeEnv = () => {
    return getEnvironment('NODE_ENV')?.trim() || '';
}

const createPathEnv = (path) => {
    const arr_env = ['env'];

    if(path.length) {
        const string_to_array = path.split('.');
        arr_env.unshift(...string_to_array);
    }

    return '.' + arr_env.join('.');
}

const pgConfig = () => {
    return {
        host: getEnvironment('DB_HOST'),
        user: getEnvironment('DB_USER'),
        password: getEnvironment('DB_PASS'),
        database: getEnvironment('DB_NAME'),
        port: getEnvironment('DB_PORT'),
        //ssl: getEnvironment('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false // Si usas SSL
    }
}

module.exports = {
    getEnvironment,
    getNumberEnv,
    nodeEnv,
    createPathEnv,
    pgConfig
}
