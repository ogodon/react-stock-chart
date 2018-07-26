import React from 'react';

export default class ArrayOfPrices extends React.Component {
  constructor(props) {
    super(props);
    this.startUpdate = this.startUpdate.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  componentWillMount() {
    this.setState({
      updateValue: false,
      valueToUpdate: {
        index: null,
        type: null,
        value: null
      }
    });
  }

  round(value, numbers) {
    return Math.round(value * Math.pow(10, numbers)) / Math.pow(10, numbers);
  }

  roundAsPossible(value) {
    if (value === 0) {
      return 0;
    }
    const result = this.round(value, 2);
    if (result === 0) {
      return value;
    }
    return result;
  }

  startUpdate(index, type) {
    this.setState({
      updateValue: true,
      valueToUpdate: {
        index,
        type
      }
    });
  }

  updateValue() {
    const { type, index } = this.state.valueToUpdate;
    this.props.onValueChange(type, index, this.newValueNode.value);
    this.setState({
      updateValue: false,
      valueToUpdate: {
        index: null,
        type: null,
        value: null
      }
    });
  }

  render() {
    const values = this.props.prices;
    return <div>
      <table className="prices" cellSpacing="0" cellPadding="0">
        <tbody>
          <tr><td>Index</td>{ values.indexes.map(value => <td key={`index-${value}`}>{value}</td>) }</tr>
          <tr><td>CAC40</td>{ values.CAC40.map((value, i) => <td key={`cac40-${values.indexes[i]}`} onClick={() => { this.startUpdate(values.indexes[i], 'CAC40') }}>{this.roundAsPossible(value)}</td>) }</tr>
          <tr><td>NASDAQ</td>{ values.NASDAQ.map((value, i) => <td key={`nasdaq-${values.indexes[i]}`} onClick={() => { this.startUpdate(values.indexes[i], 'NASDAQ') }}>{this.roundAsPossible(value)}</td>) }</tr>
        </tbody>
      </table>
      <br />
      { this.state.updateValue &&
        <div>
          Change value for index {this.state.valueToUpdate.index} of {this.state.valueToUpdate.type}
          <input ref={node => this.newValueNode = node} />
          <button onClick={() => {this.updateValue()}}>Overwrite</button>
        </div>
      }
    </div>;
  }
}
