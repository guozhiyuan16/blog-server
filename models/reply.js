// 文章回复表
module.exports = (sequelize, dataTypes) => {
    const Reply = sequelize.define(
        'reply',
        {
            id: {
                type: dataTypes.INTEGER(11),
                primaryKey: true,
                autoIncrement: true
            },
            content: {
                type: dataTypes.TEXT,
                allowNull: false,
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

    Reply.associate = models => {
        // Reply 属于 user
        Reply.belongsTo(models.user, {
            foreignKey: 'userId',
            targetKey: 'id',
            constraints: false // 在表之间添加约束意味着当使用 sequelize.sync 时，表必须以特定顺序在数据库中创建表。我们可以向其中一个关联传递
        })
    }

    return Reply
}