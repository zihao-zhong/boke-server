/**
 * redis 配置
 * redlock 分布式锁
 */
const redis = require('redis');
const redisConfig = require('../config').redis;

async function connectRedis() {
  let nextAuth = true;
  const { host, port, password } = redisConfig;
  return new Promise((resolve) => {
    const client = redis.createClient({
      host,
      port,
      password,
      no_ready_check: true,
    });
    client.auth(password, (e) => {
      if (e) {
        console.log('redis 认证失败', e.stack);
      } else {
        console.log('redis 认证成功');
        resolve(client);
        nextAuth = true;
      }
    });
    nextAuth = false;

    client.on('connect', () => {
      if (nextAuth) {
        client.auth(password, console.log);
      }
    });
    client.on('error', (e) => {
      console.log('redis client error', e.stack);
    })
  }).catch(e => { throw e });
}

module.exports = async function initRedis(app) {
  await connectRedis()
}