const jwt = require('jsonwebtoken');
const { TOKEN } = require('../config');
const createToken = options => {
    return jwt.sign(options,TOKEN.secret,{expiresIn:TOKEN.exp});
}

const valdateToken = () => {
    
}

module.exports = {
    createToken,
    valdateToken
}