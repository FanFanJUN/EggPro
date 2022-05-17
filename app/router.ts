import { Application } from "egg";

export default (app: Application) => {
  const { controller, router } = app;

  // 整体创建表
  // app.beforeStart(async () => {
  //   await app.model.sync({ alter: true }); //force  false 为不覆盖 true会删除再创建; alter true可以 添加或删除字段;
  // });

  router.get("/:name/:age", controller.home.index); // 传参  http://127.0.0.1:7001/test/12
  router.post("/postRequest", controller.home.postRequest); // post 传参
  router.get("/getParams", controller.home.getParams); // 传参  http://127.0.0.1:7001/getParams?test=12
  router.get("/", controller.home.getListByPage); // 分页查询
  router.get("/findOne", controller.home.findOne); // 查询一条
  router.post("/create", controller.home.create); // 创建一条
  router.post("/update", controller.home.update); // 更新一条
  router.post("/destroy", controller.home.destroy); // 删除一条
  router.post("/getOneAdminByIdBySQL", controller.home.getOneAdminByIdBySQL); // 原生sql语句查询一条')
};
