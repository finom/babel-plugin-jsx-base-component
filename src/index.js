const transformBase = require('./base');

module.exports = function (babel) {
  const baseComponentName = 'Base';

  const visitor = {
    JSXElement(path) {
      const nodeName = path.node.openingElement.name.name;

      if (baseComponentName === nodeName) {
        const handler = transformBase(babel);
        path.replaceWith(
          handler(path),
        );
      }
    },
  };

  return {
    inherits: require('@babel/plugin-syntax-jsx').default,
    visitor,
  };
};
