const React = require('react');
const chai = require('chai');
const chaiEnzyme = require('chai-enzyme');
const { shallow } = require('enzyme');
const Button = require('../fixtures/Button.jsx');

const { expect } = chai;

chai.use(chaiEnzyme());

describe('Base component with component prop', () => {
  it('should render tag "div" if component prop is not define', () => { // {{{
    const wrapper = shallow(
      <Base>Base component</Base>,
    );

    expect(wrapper)
      .to.have.tagName('div');
  }); // }}}

  it('should render tag "span" if component prop is define', () => { // {{{
    const wrapper = shallow(
      <Base component="span">Base component</Base>,
    );

    expect(wrapper)
      .to.have.tagName('span');
  }); // }}}

  it('should render define component', () => { // {{{
    const wrapper = shallow(
      <Base component={Button}>Base component</Base>,
    );

    expect(wrapper)
      .to.have.tagName('button');
  }); // }}}

  it('should render component by expression', () => { // {{{
    const wrapper = shallow(
      <Base component={1 === 2 ? Button : 'strong'}>Base component</Base>,
    );

    expect(wrapper)
      .to.have.tagName('strong');
  }); // }}}

  it('should render component and pass props to component', () => { // {{{
    const wrapper = shallow(
      <Base component="button" type="submit">Base component</Base>,
    );

    expect(wrapper)
      .to.have.tagName('button')
      .and
      .to.have.attr('type', 'submit');
  }); // }}}

  it('should render component and pass spread props to component', () => { // {{{
    const props = {
      type: 'submit',
      children: 'Button',
    };
    const wrapper = shallow(
      <Base component="button" {...props} />,
    );

    expect(wrapper)
      .to.have.tagName('button')
      .and
      .to.have.attr('type', 'submit');

    expect(wrapper)
      .to.have.text('Button');
  }); // }}}

  it('should render component inside a parent', () => { // {{{
    const children = 'Base component';
    const wrapper = shallow(
      <div>
        <Base component={Button}>{children}</Base>
      </div>,
    );

    expect(wrapper)
      .to.have.html(`<div><button>${children}</button></div>`);
  }); // }}}
});
