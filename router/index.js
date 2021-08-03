const fs = require('fs');

module.exports = app => {
    fs.readdirSync(__dirname)
        .filter(file => file !== 'index.js')
        .forEach(file => {
            const route = require(`./${file}`);
            app.use(route.routes()).use(route.allowedMethods())
        })
}

