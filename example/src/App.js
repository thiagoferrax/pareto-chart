import React, { Component } from 'react'

import ParetoChart from 'pareto-chart'

export default class App extends Component {
  render() {
    return (
      <div style={{ width: 1100, margin: "15px auto" }}>
        <h1>ParetoChart Example</h1>
        <hr/>
        <br/>
        <ParetoChart
          data={
            {
              Codification: 40,
              Tests: 20,
              Release: 10,
              Analysis: 5,
              Planning: 3
            }
          }
          yLabel='Defects by discipline'
        />
      </div>
    )
  }
}
