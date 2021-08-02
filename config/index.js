const config = {
    PORT:3000, // 后台服务启动端口
    ADMIN_GITHUB_LOGIN_NAME: 'guozhiyuan16', // GitHub 登录的账户名 user
    DATABASE: {
        database: 'blog',
        user: 'root',
        password: 'root',
        options: {
          host: 'localhost', // 连接的 host 地址
          dialect: 'mysql', // 连接到 mysql
          pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
          },
          define: {
            timestamps: false, // 默认不加时间戳
            freezeTableName: true // 表名默认不加 s
          },
          timezone: '+08:00'
        }
      }
}

module.exports = config;