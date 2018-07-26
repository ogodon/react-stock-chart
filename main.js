import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import _ from 'lodash';

import ArrayOfPrices from './components/arrayOfPrices';
import GraphOfPrices from './components/graphOfPrices';

class Main extends React.Component {
  componentWillMount() {
    this.setState({});
  }

  componentDidMount() {
    this.loadData();
    this.loadDataInterval = setInterval(() => {
      this.loadData();
    }, 1000);
  }

  /*
{
  CAC40
  :
  {2: 13, 3: 40}
  NASDAQ
  :
  {2: 10}
}
  */

  componentWillUnmount() {
    clearInterval(this.loadDataInterval);
  }

  loadData() {
    axios.get('http://localhost:8000?count=20')
    .then(response => this.setState({ prices: response.data }));
  }

  onValueChange(type, index, value) {
    const overwrites = this.state.overwrites || {};
    if (!_.get(overwrites, type, false)) {
      overwrites[type] = {};
    }
    overwrites[type][index] = value;
    this.setState({ overwrites });
  }

  transformPrices(prices, overwrites) {
    const indexes = [];
    const CAC40 = [];
    const NASDAQ = [];
    prices.forEach(element => {
      indexes.push(element.index);
      if (_.get(overwrites, `CAC40.${element.index}`, false)) {
        CAC40.push(_.get(overwrites, `CAC40.${element.index}`, false));
      } else {
        CAC40.push(element.stocks.CAC40);
      }
      if (_.get(overwrites, `NASDAQ.${element.index}`, false)) {
        NASDAQ.push(_.get(overwrites, `NASDAQ.${element.index}`, false));
      } else {
        NASDAQ.push(element.stocks.NASDAQ);
      }
    });
    return {
      indexes,
      CAC40,
      NASDAQ
    };
  }

  render() {
    const prices = this.state.prices || [];
    const overwrites = this.state.overwrites || { CAC40: {}, NASDAQ: {} };
    const pricesForDisplay = this.transformPrices(prices, overwrites);
    return <div>
      <GraphOfPrices prices={pricesForDisplay} />
      <br /><br />
      <ArrayOfPrices prices={pricesForDisplay} onValueChange={this.onValueChange.bind(this)} />
    </div>;
  }
}

ReactDOM.render(<Main/>, document.getElementById('root'));