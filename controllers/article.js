
class ArticleController {
    static async getList(ctx){
        ctx.body = '获取文章列表'
    }
}

module.exports = ArticleController