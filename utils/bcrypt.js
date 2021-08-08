const bcrypt = require('bcrypt-nodejs');

const encrypt = (password) => {
    return new Promise((resolve,reject)=>{
         //生成salt的迭代次数
        const saltRounds = 10;
        //生成salt并获取hash值
        bcrypt.genSalt(saltRounds, (err, salt)=>{
            if(err) reject(err)
            bcrypt.hash(password,salt,null, (err, hash)=>{
                if(err) reject(err)
                else resolve(hash)
            })
        })
    })
}

/**
 * @func comparePassword 密码校验
 * @param {String} _password 用户输入的密码
 * @param {String} hash 数据库中存储的加密后的密码
 * @returns {String} 
 */
const comparePassword = (_password,hash) => {
    return new Promise((resolve,reject)=>{
        bcrypt.compare(_password,hash,(err,matched)=>{
            if(err) reject(err)
            else resolve(matched)
        })  
    })
}

module.exports = {
    encrypt,comparePassword
}