import React, { Component } from 'react'

import ParetoChart from 'pareto-chart'

export default class App extends Component {
  render() {
    return (
      <div style={{ width: 1100, margin: "15px auto" }}>
        <h1>ParetoChart Example</h1>
        <hr />
        <br />
        <ParetoChart
          data={
            {
              'Defects by area': {
                Tests: 20,
                Codification: 40,
                Release: 10,
                Analysis: 5,
                Planning: 3
              },
              'Issues by area': {
                Codification: 40,
                Release: 10,
                Analysis: 15,
                Planning: 37
              }
            }
          }
        />
      </div>
    )
  }
}
