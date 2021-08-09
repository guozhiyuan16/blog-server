const Router = require('koa-router');
const router = new Router();

const { getTagList,getCategoryList } = require('../controllers/tag');
const { login,register } = require('../controllers/user');

router
    .post('/login',login)
    .post('/register',register)
    .get('/tag/list', getTagList)
    .get('/category/list', getCategoryList)

module.exports = router;