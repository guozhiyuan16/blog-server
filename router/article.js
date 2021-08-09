const Router = require('koa-router');
const router = new Router({
    prefix: '/article'
});

const {
    create,
    findById,
    updateById,
    deleteById,
    getList
} = require('../controllers/article');
router
    .post('/', create) // 创建文章
    .get('/list', getList)  // 获取文章列表
    .get('/:id', findById) // 获取指定文章
    .put('/:id', updateById) // 修改指定文章
    .delete('/:id', deleteById) // 删除指定文章
    

module.exports = router