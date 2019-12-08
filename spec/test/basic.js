const React = require('react');
const chai = require('chai');
const chaiEnzyme = require('chai-enzyme');
const { shallow } = require('enzyme');

const { expect } = chai;

chai.use(chaiEnzyme());

describe('Base component with children', () => {
  it('should render component when children is variable', () => { // {{{
    const children = 'Base component';
    const wrapper = shallow(
      <Base>{children}</Base>,
    );

    expect(wrapper)
      .to.have.text('Base component');
  }); // }}}

  it('should render component when children is conditional expression', () => { // {{{
    const wrapper = shallow(
      <Base>{1 === 2 ? 'yes' : 'no'}</Base>,
    );

    expect(wrapper)
      .to.have.text('no');
  }); // }}}

  it('should render component when children is logical expression', () => { // {{{
    let noValueVariable;

    const wrapper = shallow(
      <Base>{noValueVariable || 'blank'}</Base>,
    );

    expect(wrapper)
      .to.have.text('blank');
  }); // }}}

  it('should render component when children is call expression', () => { // {{{
    const list = ['this', 'is', 'base', 'component'];

    const wrapper = shallow(
      <Base>
        {
          list.map((value) => value.toUpperCase())
        }
      </Base>,
    );

    expect(wrapper)
      .to.have.text('THISISBASECOMPONENT');
  }); // }}}

  it('should render component when children is member expression', () => { // {{{
    const list = ['this', 'is', 'base', 'component'];
    const wrapper = shallow(
      <Base>{list[0]}</Base>,
    );

    expect(wrapper)
      .to.have.text('this');
  }); // }}}

  it('should render component when children is function expression', () => { // {{{
    const wrapper = shallow(
      <Base>{function () { return 'Base component'; }()}</Base>,
    );

    expect(wrapper)
      .to.have.text('Base component');
  }); // }}}

  it('should render component when children is arrow function expression', () => { // {{{
    const wrapper = shallow(
      <Base>{(() => 'Base component')()}</Base>,
    );

    expect(wrapper)
      .to.have.text('Base component');
  }); // }}}

  it('should render component when children is array expression', () => { // {{{
    const wrapper = shallow(
      <Base>{['Base', ' ', 'component']}</Base>,
    );

    expect(wrapper)
      .to.have.text('Base component');
  }); // }}}

  it('should render component when children is numeric literal', () => { // {{{
    const wrapper = shallow(
      <Base>{3.14}</Base>,
    );

    expect(wrapper)
      .to.have.text('3.14');
  }); // }}}

  it('should render component when children is boolean literal', () => { // {{{
    const wrapper = shallow(
      <Base>{true}</Base>,
    );

    expect(wrapper)
      .to.have.text('');
  }); // }}}

  it('should render component with complex children', () => { // {{{
    const list = ['this', 'is', 'base', 'component'];

    const wrapper = shallow(
      <Base>
        This is
        <strong>Base</strong> <strong>component</strong>
        {list.length > 0 ? '.' : '!'}
      </Base>,
    );

    expect(wrapper)
      .to.have.html('<div>This is<strong>Base</strong> <strong>component</strong>.</div>');
  }); // }}}
});
