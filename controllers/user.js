const Joi = require('joi');
const { encrypt,comparePassword } = require('../utils/bcrypt');
const { createToken } = require('../utils/token');
const {
    article: ArticleModel,
    tag: TagModel,
    category: CategoryModel,
    comment: CommentModel,
    user: UserModel,
    sequelize
} = require('../models');

class UserController {
    static async login(ctx){
        const validator = ctx.validate(ctx.request.body,{
            username: Joi.string().required(),
            password: Joi.string().required(),
        })
        if(validator){
            const { username,password } = ctx.request.body;
            const user =  await UserModel.findOne({ where:{ username } })
            if(user){
                const isMatched = await comparePassword(password,user.password);
                if(isMatched){
                    // 发放用户信息，token
                    const { username, id , role } = user;
                    const token = createToken({
                        username,id,role
                    })
                    ctx.body = { username,role,id,token }
                }else{
                    ctx.throw(403,'密码不正确')
                }
            }else{
                ctx.throw(403,'用户不存在')
            }
        }
    }
    static async register(ctx){
        const validator = ctx.validate(ctx.request.body,{
            username:Joi.string().required(),
            password:Joi.string().required(),
            email:Joi.string().email().required()
        })

        if(validator){
            const { username,password,email } = ctx.request.body;
            const result = await UserModel.findOne({where:{ email }})
            if(result){
                ctx.throw(403,'邮箱已被注册');
            }else{
               const user = await UserModel.findOne({where:{ username }})
               console.log(user);
               if(user){
                    ctx.throw(403,'用户名已存在');
               }else{
                   // 密码加密
                   const _password = await encrypt(password);
                   // 创建用户
                   await UserModel.create({ username, password:_password,email })
                   ctx.body = { code: 200, msg: '注册成功' };
               }
            }
        }
    }
    static async validate(ctx){
        
    }
}

module.exports = UserController;