const { default: template } = require('@babel/template');
const astUtil = require('./util/ast');

const buildNonConditional = template(`
  (COMPONENT_VARIABLE = COMPONENT_VALUE, COMPONENT)
`);

const buildConditional = template(`
  (COMPONENT_VARIABLE = COMPONENT_VALUE, EXISTS ? COMPONENT : null)
`);


const COMPONENT_DEFAULT_NAME = 'div';
const baseAttributes = {
  exists: 'exists',
  component: 'component',
};

module.exports = function (babel) {
  const { types: t } = babel;

  return function (path) {
    const { node } = path;

    const children = astUtil.getChildren(t, node);
    const attributes = astUtil.getAttributes(node);

    const existsAttribute = astUtil.getAttribute(t, attributes, baseAttributes.exists);

    const availableAttributes = attributes.filter((attr) => (
      t.isJSXSpreadAttribute(attr)
        || typeof baseAttributes[attr.name.name] === 'undefined'
    ));

    const COMPONENT_VARIABLE = path.hub.file.path.scope.generateUidIdentifier('Base');
    const COMPONENT_VALUE = astUtil.getAttributeValue(
      t,
      attributes,
      baseAttributes.component,
    ) || t.stringLiteral(COMPONENT_DEFAULT_NAME);

    const COMPONENT = astUtil.getjSXElement(
      t,
      COMPONENT_VARIABLE.name,
      availableAttributes,
      children,
    );

    const variable = t.variableDeclaration('var', [
      t.variableDeclarator(
        COMPONENT_VARIABLE,
        null,
      ),
    ]);

    path.hub.file.path.get('body')[0].insertBefore(variable);

    if (existsAttribute && existsAttribute.value) {
      const EXISTS = existsAttribute.value.expression;


      return buildConditional({
        COMPONENT, COMPONENT_VARIABLE, COMPONENT_VALUE, EXISTS,
      }).expression;
    }

    return buildNonConditional({
      COMPONENT, COMPONENT_VARIABLE, COMPONENT_VALUE,
    }).expression;
  };
};
