const Joi = require('joi');

class TagController{
    static async getTagList(ctx){
        ctx.body = 'tagList'
    }
    static async getCategoryList(ctx){
        ctx.body = 'categoryList'
    }
}

module.exports = TagController