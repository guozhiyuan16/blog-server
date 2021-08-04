module.exports = (sequelize, dataTypes) => {
    const User = sequelize.define(
        'user',
        {
            id: {
                type: dataTypes.INTEGER(11),
                primaryKey: true, // 主键
                autoIncrement: true // 自增
            },
            username: {
                type: dataTypes.STRING(50),
                allowNull: false
            },
            password: {
                type: dataTypes.STRING(50),
                comment: '通过 bcrypt 加密后的密码' // 仅限站内注册用户
            },
            email: dataTypes.STRING(50),
            role: {
                type: dataTypes.TINYINT,
                defaultValue: 2,
                comment: '用户权限：1 - admin, 2 - 普通用户'
            },
            createdAt: {
                type: dataTypes.DATE,
                defaultValue: dataTypes.NOW,
                get(){
                    return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
                }
            },
            updatedAt: {
                type: dataTypes.DATE,
                defaultValue: dataTypes.NOW,
                get(){
                    return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
                }
            }
        },
        {
            timestamps: true
        })
    User.associate = models => {
        User.hasMany(models.comment)
        User.hasMany(models.reply)
        // User.hasMany(models.ip)
    }
    return User
}