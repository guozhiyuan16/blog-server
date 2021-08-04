const Joi = require('joi');

const validate = (params = {},scheme = {}) => {
    const ctx = this;
    // allowUnknown- 当true，允许对象包含被忽略的未知键。默认为false
    const validator = Joi.validate( params , scheme , { allowUnknown: true })
    if(validator.error){
        ctx.throw(400, validator.error.message)
        return false
    }
    return true
}

module.exports = {
    validate
}