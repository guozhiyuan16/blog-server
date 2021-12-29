const jwt = require('jsonwebtoken');
const { TOKEN } = require('../config');
const createToken = options => {
    return jwt.sign(options,TOKEN.secret,{expiresIn:TOKEN.exp});
}

const validateToken = () => {
    console.log('验证token')
}

module.exports = {
    createToken,
    validateToken
}