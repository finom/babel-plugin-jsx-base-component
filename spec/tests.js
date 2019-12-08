const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const Base = require('../src/index');

Enzyme.configure({ adapter: new Adapter() });


require('@babel/register')({
  presets: ['@babel/preset-react'],
  plugins: [Base],
  cache: false,
});

require('./test/basic');
require('./test/exists');
require('./test/component');
