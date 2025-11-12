// src/config.js
const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        baseApiUrl: 'http://177.153.69.84:5084/api' 
    },
    production: {
        baseApiUrl: `${window.location.origin}/api`
    }
};

export default config[env];