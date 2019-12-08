const React = require('react');
const chai = require('chai');
const chaiEnzyme = require('chai-enzyme');
const { shallow } = require('enzyme');

const { expect } = chai;

chai.use(chaiEnzyme());

describe('Base component with exists prop', () => {
  it('should render if exists prop is not define', () => { // {{{
    const wrapper = shallow(
      <Base>Base component</Base>,
    );

    expect(wrapper)
      .to.have.text('Base component');
  }); // }}}

  it('should render if exists prop omit the value', () => { // {{{
    const wrapper = shallow(
      <Base exists>Base component</Base>,
    );

    expect(wrapper)
      .to.have.text('Base component');
  }); // }}}

  it('should render if exists prop is true', () => { // {{{
    const wrapper = shallow(
      <Base exists={true}>Base component</Base>,
    );

    expect(wrapper)
      .to.have.text('Base component');
  }); // }}}

  it('should not render if exists prop is false', () => { // {{{
    const wrapper = <Base exists={false}>Base component</Base>;

    expect(wrapper)
      .to.be.null;
  }); // }}}

  it('should render if exists prop expression calc to true', () => { // {{{
    const list = ['a', 'b', 'c'];
    const wrapper = shallow(
      <Base exists={list.length > 0}>Base component</Base>,
    );

    expect(wrapper)
      .to.have.text('Base component');
  }); // }}}

  it('should render if exists prop expression calc to false', () => { // {{{
    const list = ['a', 'b', 'c'];
    const wrapper = (
      <Base exists={list.length === 0}>Base component</Base>
    );

    expect(wrapper)
      .to.be.null;
  }); // }}}
});
