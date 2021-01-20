module.exports = function instance(Class, ...args) {
  const ins = new Class(...args);
  const className = Object.getOwnPropertyNames(Object.getPrototypeOf(ins));

  for (let name of className) {
    const func = ins[name];
    const isConstructor = name === 'constructor';
    const isNotFunction = typeof func !== 'function';

    if (!isConstructor && !isNotFunction) {
      ins[name] = func.bind(ins);
    }
  }
  return ins;
}
