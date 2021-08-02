module.exports = ( sequelize, dataTypes ) => {
    const Article = sequelize.define('article',{
        id:{
            type:dataTypes.INTEGER(11),
            primaryKey: true, // 主键
            autoIncrement:true // 自增
        }
    })

    Article.associate = models => {
        // Article.hasMany(models.comment)
    }
    return Article
}