// 文章分类表
module.exports = (sequelize, dataTypes) => {
    const Category = sequelize.define(
        'category',
        {
            id: {
                type: dataTypes.INTEGER(11),
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: dataTypes.STRING(100),
                allowNull: false
            }
        })

    Category.associate = models => {
        // Category 属于 article
        Category.belongsTo(models.article, {
            // as: 'article', // 这将在 Category 中 创建 articleId 外键
            // foreignKey: 'articleId',
            // targetKey: 'id', 
            // constraints: false // 在表之间添加约束意味着当使用 sequelize.sync 时，表必须以特定顺序在数据库中创建表。我们可以向其中一个关联传递
        })
    }

    return Category
}

// BelongsTo关联是原模型上存在一对一关系的外键的关联
// 外键 默认情况下，将根据目标模型名称(article)和目标主键名称(id)来生成belongsTo关系的外键(articleId)
// 如果定义了as，它将代替目标模型名称。
// 在所有情况下，都可以使用foreignKey选项覆盖默认外键。
// 目标键是目标模型上的列，其是源模型外键列所指向的列 默认情况下，belongsTo关系的目标键会是目标模型的主键。