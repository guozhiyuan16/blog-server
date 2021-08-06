const Joi = require('joi');
// 导入 models
const {
    article: ArticleModel,
    tag: TagModel,
    category: CategoryModel,
    comment: CommentModel,
    user: UserModel,
    sequelize
} = require('../models')

class ArticleController {
    static async create(ctx) {
        const validator = ctx.validate(ctx.request.body, {
            // authorId: Joi.number().required(),
            title: Joi.string().required(),
            content: Joi.string(),
            categoryList: Joi.array(),
            tagList: Joi.array()
        })
        if (validator) {
            const { authorId,title,content, categoryList = [], tagList = [] } = ctx.request.body;
            const result = await ArticleModel.findOne({ where: {title} });
            if (result) {
                ctx.throw(403, '创建失败，该文章已存在')
            } else {
                const tags = tagList.map(t => ({ name: t }))
                const categories = categoryList.map(c => ({ name: c }))
                const data = await ArticleModel.create(
                    { title, content, authorId, tags, categories}, 
                    { include: [TagModel, CategoryModel] }
                )
                ctx.body = data;
            }
        }
    }
    static async findById(ctx) {
        const data = await ArticleModel.findOne({
            where: { id: ctx.params.id },
            include: [{
                    model: TagModel,
                    attributes: ['name']
                },
                {
                    model: CategoryModel,
                    attributes: ['name']
                }
            ],
            row: true
        });
        if (data) {
            ctx.body = data
        } else {
            ctx.throw(403, '没有找到对应文章')
        }
    }
    static async updateById(ctx) {
        console.log('update',ctx.request.body)
        const validator = ctx.validate({
            articleId: ctx.params.id,
            ...ctx.request.body
        }, {
            articleId: Joi.number().required(),
            title: Joi.string().required(),
            content: Joi.string(),
            categories: Joi.array(),
            tags: Joi.array()
        })
        if (validator) {
            const { title, content,categories,tags } = ctx.request.body;
            await ArticleModel.update({title,content},{where:{id:ctx.params.id}})
            ctx.body = '204'
        }
        
    }
    static async deleteById(ctx) {
        ctx.body = '删除'
    }
    static async getList(ctx) {
        ctx.body = '获取文章列表'
    }
}

module.exports = ArticleController