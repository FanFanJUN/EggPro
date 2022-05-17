"use strict";

module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define(
    "user",
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      password: STRING(30),
      sex: STRING(30),
      IDnumber: { type: INTEGER, field: "IDnumber" },
      description: { type: STRING(30), field: "description", comment: "描述" },
      // birthDate: { type: STRING(30), field: "birthDate" },
    },
    {
      timestamps: false, // 自动增加创建时间
      tableName: "test_user", //设置表名称
    }
  );
  // 修改表结构或创建表
  // User.sync({ alter: true });

  return User;
};
/*
  defaultValue 设置默认  Boolean
  allowNull 是否允许为空 Boolean
  unique 属性用来创建一个唯一约束. Boolean | string
  primaryKey 用于定义主键.  Boolean
  autoIncrement 可用于创建自增的整数列 Boolean
  comment 注释   string;
  references: {
    // 这是引用另一个模型
    model: Bar,

    // 这是引用模型的列名称
    key: 'id',

    // 这声明什么时候检查外键约束. 仅限PostgreSQL.
    deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
  }
*/
