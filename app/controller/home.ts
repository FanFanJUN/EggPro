import { Controller } from "egg";

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    const { name, age } = ctx.params; // get参数 http://127.0.0.1:7001/test/12
    ctx.body = await ctx.service.test.sayHi(`${name}${age}`);
  }

  public async getParams() {
    const { ctx } = this;
    const { test } = ctx.query; // get参数 http://127.0.0.1:7001/getParams?test=12
    ctx.body = await ctx.service.test.sayHi(`${test}`);
  }

  public async postRequest() {
    const { ctx } = this;
    const { name, age } = ctx.request.body; // post参数 { name: "test", age: 12 }
    ctx.body = await ctx.service.test.add(`${name}${age}`);
  }

  public async getListByPage() {
    const { ctx } = this;
    ctx.body = await ctx.model.User.findAll({
      limit: 10,
      offset: 0,
      order: [["id", "desc"]],
    });
  }

  public async findOne() {
    const ctx = this.ctx;
    var result = await ctx.model.User.findByPk(106);
    ctx.body = result || "";
  }

  public async create() {
    const ctx = this.ctx;
    const user = await ctx.model.User.create({
      name: "张三",
      password: "testfromegg",
    });
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const ctx = this.ctx;
    const id = 106;
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }
    await user.update({ name: "李四", password: "43" });
    ctx.body = user;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = 111;
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    await user.destroy();
    ctx.status = 200;
    ctx.body = "删除成功";
  }

  // 原生sql查询所有admin信息
  //   async getAllAdminsBySQL() {
  //     const { ctx } = this;
  //     const articles = await ctx.app.model.query('select * from admins', {type:'SELECT'});
  //     ctx.body = {
  //         data: articles,
  //     };
  //     ctx.status = 200;
  //     ctx.username='data'
  // }

  // 原生sql查询所有信息
  async getOneAdminByIdBySQL() {
    const { ctx } = this;
    // const id = 3;
    // 如果直接写成'select * from admins where id ='+id;会报错，因为查询的时候，id是有引号的。
    // 原生的sql报错需要直接去sql图形化界面中测试sql语句是否正确，才可以写到代码中
    // const queryString = `select * from article where id = ${id}`;
    const queryString =
      "select * from SYS_DIC left join SYS_DIC_CATEGORY on SYS_DIC.DICTIONARY_CATEGORY_NO = SYS_DIC_CATEGORY.DICTIONARY_CATEGORY_NO";
    const articles = await ctx.app.model.query(queryString, { type: "SELECT" });
    ctx.body = {
      data: articles,
    };
  }

  async updateBysql() {
    const { ctx } = this;
    // const id = 3;
    const queryString =
      "select * from SYS_DIC left join SYS_DIC_CATEGORY on SYS_DIC.DICTIONARY_CATEGORY_NO = SYS_DIC_CATEGORY.DICTIONARY_CATEGORY_NO";
    const articles = await ctx.app.model.query(queryString, { type: "UPDATE" });
    ctx.body = {
      data: articles,
    };
  }
}
