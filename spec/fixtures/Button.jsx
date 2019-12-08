var React = require('react');

module.exports = class extends React.Component {
  render() {
    return (
      <button>{this.props.children}</button>
    );
  }
}
