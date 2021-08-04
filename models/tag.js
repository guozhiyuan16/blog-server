// 文章标签表
module.exports = (sequelize, dataTypes) => {
    const Tag = sequelize.define(
        'tag',
        {
            id: {
                type: dataTypes.INTEGER(11),
                primaryKey: true, // 主键
                autoIncrement: true // 自增
            },
            name: {
                type: dataTypes.STRING(100),
                allowNull: false
            }
        })

    Tag.associate = models => {
        // Tag 属于 article
        Tag.belongsTo(models.article, {
            // as: 'article', // 这将在 Category 中 创建 articleId 外键
            // foreignKey: 'articleId',
            // targetKey: 'id',
            // constraints: false // 在表之间添加约束意味着当使用 sequelize.sync 时，表必须以特定顺序在数据库中创建表。我们可以向其中一个关联传递
        })
    }

    return Tag
}