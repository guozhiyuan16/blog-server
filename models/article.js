module.exports = (sequelize, dataTypes) => {
    const Article = sequelize.define(
        'article',
        {
            id: {
                type: dataTypes.INTEGER(11),
                primaryKey: true, // 主键
                autoIncrement: true // 自增
            },
            title: {
                type: dataTypes.STRING(255),
                allowNull: false
            },
            content: dataTypes.TEXT,
            viewCount: {
                type: dataTypes.INTEGER(11),
                defaultValue: 0
            },
            createAt: {
                type: dataTypes.DATE,
                defaultValue: dataTypes.NOW,
            },
            updateAt: {
                type: dataTypes.DATE,
                defaultValue: dataTypes.NOW,
            }
        },
        {
            timestamps: true
        })

    Article.associate = models => {
        Article.hasMany(models.tag);        // 一篇文章对应多个标签
        Article.hasMany(models.category);   // 一篇文章对应多个分类
        Article.hasMany(models.comment);    // 一篇文章对应多个留言
        Article.hasMany(models.reply);      // 一篇文章对应多个回复
    }
    return Article
}