module.exports = function init(app) {
  // 全局的错误监听
  app.use(async function(ctx, next) {
    try {
      await next();
    } catch (e) {
      ctx.error(e);
      console.log(`Error: ${e.message}`);
      // ctx.app.emit('error', e, ctx);
    };
  });

  // 存储一个接口调取时的时间戳
  // app.use(async function(ctx, next) {
  //   try {
  //     ctx.dateNow = Date.now();
  //     await next();
  //   } catch (e) {};
  // });
}