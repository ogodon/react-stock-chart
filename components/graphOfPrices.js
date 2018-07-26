import React from 'react';
import rd3 from 'react-d3';

export default class GraphOfPrices extends React.Component {
  buildSerie(name, indexes, prices) {
    const values = prices.map((value, i) => {
      return {
        x: indexes[i],
        y: value
      };
    });
    return {
      name,
      values
    };
  }

  buildData(prices) {
    const data = [];
    const { indexes, CAC40, NASDAQ } = prices;
    data.push(this.buildSerie('CAC40', indexes, CAC40));
    data.push(this.buildSerie('NASDAQ', indexes, NASDAQ));
    return data;
  }

  render() {
    const LineChart = rd3.LineChart;
    const dataBuilt = this.buildData(this.props.prices);
    if (this.props.prices.indexes.length === 0) {
      return null;
    }
    return <div className='chart-container'>
      <LineChart title="Prices" width={700} height={500} data={dataBuilt} legend={true} />
    </div>;
  }
}
