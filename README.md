## `sequelize`基本用法总结

### 安装
```bash
# 安装sequelize
yarn add sequelize -S
# 为选择的数据库安装驱动程序
yarn add mysql2 -S
```

### 链接到数据库

```js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize()

```
> [sequelize参数说明](https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor)

### 模型

- `模型是代表数据库中表的抽象`
- Sequelize中的模型有一个名称。此名称不必与它在数据库中标识的表的名称相同
- `通常` 模型具有单数名称（User）, 表具有负数名称（Users）

#### 定义模型

- sequelize.define(modelName, attributes, options)
- class User extends Model {};   User.init({attributes},{options})

> `在内部，sequelize.define调用Model.init`，因此两种方法`本质上是等效`的。


```js

const User = sequelize.define('User', {
  // 模型属性
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull 默认为true
    defaultValue,  // Sequelize 假定列的默认值为NULL。可以通过defaultValue向列定义传递特定信息来更改此行为
  }
  age: DataTypes.INTEGER(11) // 如果只有唯一指定，可缩短语法
  
}, {
  // 模型其他的配置
  freezeTableName: true // 表名等于模型名
  // or
  tableName: 'User' // 指定表名

  timestamps: false // 禁用时间戳(默认情况开启时间戳,可提升到公共配置)
});


```

> 定义的模型可以通过 `sequelize.models.xxx` 来调用
> 当没有给出表名时，Sequelize 会`自动将模型名复数化并将其用作表名` ( freezeTableName: true选项停止 Sequelize 执行的自动复数化 )

#### 模型同步

- User.sync()   如果表不存在，则创建表（存在不执行任何操作）
- User.sync({ force:true })  创建表，如果已存在，首先删除
- User.sync({ alter:true })  这会检查数据库中表的当前状态（它有哪些列，它们的数据类型是什么等），然后在表中执行必要的更改以使其与模型匹配

> sequelize.sync({ force:true }) 一次同步所以模型

> sync({ force: true })并且sync({ alter: true })可以是破坏性操作 因此，`不建议将它们用于生产`

#### 其他列选项

```js
const { Model, DataTypes } = require("sequelize");
class Foo extends Model {}
Foo.init({
    flag:{
        type:DataTypes.INTEGER(11),
        unique: true, // 唯一的
        primaryKey: true, // 主键
        autoIncrement: true  // 自增
        references:{  // 指定外键
            model:Bar,
            key:'id'
        }
    }
})

```

#### 模型实例

- 模型是ES6类，类的一个实例代表该模型中的一个对象（映射到数据库中表的一行）
- 几乎所有的Sequelize方法都是异步的
- create 是 build + save的语法糖

#### 模型查询-基础
