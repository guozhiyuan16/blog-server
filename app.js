const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body'); // 解析请求体
const cors = require('koa2-cors'); // 解决跨域
const error = require('koa-json-error'); // 解决返回客户端的信息
const logger = require('koa-logger'); // 请求日志打印
const moment = require('moment');
const chalk = require('chalk');

const config = require('./config'); // 公共配置文件

const loadRouter = require('./router');
const db = require('./models');

const app = new Koa();

const processLogger = logger( log =>{
    console.log(chalk.cyan(moment().format('YYYY-MM-DD HH:mm:ss')) + log)
})

// const context = require('./utils/context');

// middlewares
// const authHandler = require('./middlewares/authHandler');

app
    .use(cors())
    .use(koaBody({
        multipart:true,// 支持文件上传
        formidable:{
            maxFields: 2000 * 1024 * 1024, // 设置上传文件大小最大限制 
            keepExtensions: true // 保留文件扩展名
        } 
    }))
    .use(
        error({
            postFormat: (e, { stack, ...rest }) => (process.env.NODE_ENV !== 'development' ? rest : { stack, ...rest })
        })
    )
    .use(processLogger)

loadRouter(app);

app.listen(config.PORT, async () => {
    db.sequelize
        .sync({ force: false })
        .then(async ()=> {
            console.log('Connection has been established successfully.')
            console.log(`sever listen on http://127.0.0.1:${config.PORT}`)
        })
        .catch(err=>{
            console.error('Unable to connect to the database:', err);
        })


    // 链接数据库，初始化模型
    // try {
    //     await sequelize.authenticate();
    //     console.log('Connection has been established successfully.');
    //   } catch (error) {
    //     console.error('Unable to connect to the database:', error);
    // }

})