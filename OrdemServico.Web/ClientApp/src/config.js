// src/config.js
const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        baseApiUrl: 'http://localhost:5084/api' 
    },
    production: {
        baseApiUrl: `${window.location.origin}/api`
    }
};

export default config[env];