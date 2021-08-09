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
            const { authorId, title, content, categoryList = [], tagList = [] } = ctx.request.body;
            const result = await ArticleModel.findOne({ where: { title } });
            if (result) {
                ctx.throw(403, '创建失败，该文章已存在')
            } else {
                const tags = tagList.map(t => ({ name: t }))
                const categories = categoryList.map(c => ({ name: c }))
                const data = await ArticleModel.create({
                    title,
                    content,
                    authorId,
                    tags,
                    categories
                }, {
                    include: [ TagModel, CategoryModel ]
                })
                ctx.body = data;
            }
        }
    }
    static async findById(ctx) {
        const result = await ArticleModel.findOne({ 
            where: { id:ctx.params.id }, 
            include:[
                { model:TagModel }, 
                { model:CategoryModel }
            ]
        });
        if (result) {
            ctx.body = result;
        } else {
            ctx.throw(403, '没有找到对应文章')
        }

    }
    static async updateById(ctx) {
        const validator = ctx.validate({
            articleId: ctx.params.id,
            ...ctx.request.body
        },{
            articleId: Joi.number().required(),
            title:Joi.string(),
            content:Joi.string(),
            categoryList: Joi.array(),
            tagList: Joi.array()
        })
        if(validator){
            const { title, content, categoryList=[], tagList=[]} = ctx.request.body; // 解析请求体
            const articleId = parseInt(ctx.params.id);
            const tags = tagList.map( t => ({ name:t , articleId }) );
            const categories = categoryList.map( c => ({ name:c ,articleId}) );
            await ArticleModel.update({ title,content },{ where: { id : articleId }});
            await TagModel.destroy({ where: { articleId } })
            await TagModel.bulkCreate( tags )
            await CategoryModel.destroy({ where: { articleId } })
            await CategoryModel.bulkCreate( categories )
            ctx.body = 204;
        }
    }
    static async deleteById(ctx) {
        const validator = ctx.validate({
            articleId: ctx.params.id 
        },{
            articleId:Joi.number().required()
        })
        if(validator){
            const articleId = parseInt(ctx.params.id);
            await ArticleModel.destroy({ where:{id:articleId} })
            await TagModel.destroy({ where: { articleId } })
            await CategoryModel.destroy({ where:{id:articleId} })
            ctx.body = 204
        }
    }
    static async getList(ctx) {
        const validator = ctx.validate(ctx.query, {
            page:Joi.string(),
            pageSize:Joi.number(),
            keyword: Joi.string().allow(''),
            category:Joi.string(),
            tag:Joi.string()
        })

        if(validator){
            const { page=1,pageSize=10,keyword= "",tag,category} = ctx.query
            const tagFilter = tag? {name:tag}:null;
            const categoryFilter = category? {name:category }:null;

            const data = await ArticleModel.findAndCountAll({
                where:{
                    $or:{
                        title:{
                            $like:`%${keyword}%`
                        },
                        content:{
                            $like:`%${keyword}%`
                        }
                    },
                },
                include:[
                    { model:TagModel, attributes:['name'],where: tagFilter },
                    { model:CategoryModel,attributes: ['name'], where: categoryFilter }
                ],
                offset: (page - 1) * pageSize,
                limit: parseInt(pageSize),
                distinct: true // count 计算
            })

            ctx.body = data;
        }
       
    }
}

module.exports = ArticleController