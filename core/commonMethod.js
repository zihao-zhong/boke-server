/**
 * 定义全局的响应处理方法
 */

module.exports = function(app) {
  app.context.success = function(data = {}, status = 200) {
    this.set({ 'Content-Type': 'application/json' });
    this.status = status;
    this.body = {
      code: 0,
      data,
    };
  };

  app.context.error = function(err = 'Error', status = 400) {
    this.set({ 'Content-Type': 'application/json' });
    this.status = status;
    this.body = {
      code: -1,
      message: err.message || 'Server Error',
    };
  };

  app.context.jsonp = function(data, callback) {
    this.status = 200;
    this.set({ 'Content-Type': 'application/javascript' });
    this.body = `;${callback}(${JSON.stringify(data)})`;
  };

  app.context.html = function(data) {
    this.status = 200;
    this.set({ 'Content-Type': 'text/html' });
    this.body = data;
  };
};