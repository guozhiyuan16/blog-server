module.exports = ( sequelize, dataTypes ) => {
    const User =  sequelize.define('user',{
        id:{
            type:dataTypes.INTEGER(11),
            primaryKey: true, // 主键
            autoIncrement:true // 自增
        }
    })
    User.associate = models => {
        // User.hasMany(models.comment)
    }
    return User
}