const Router = require('koa-router');
const router = new Router({ prefix:'/article'});

const { getList } = require('../controllers/article');
router
    .get('/list', getList);


module.exports = router