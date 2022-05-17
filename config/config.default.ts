import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1651743614367_2025";

  // add your egg config in here
  config.middleware = [];

  // 跨域配置
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ["*"], // 配置白名单
  };
  config.sequelize = {
    dialect: "mysql",
    host: "127.0.0.1",
    port: 3306,
    database: "crud",
    username: "root",
    password: "lc012269",
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
