# pareto-chart

> 

Get a pareto chart that can be used as a react component.

[![NPM](https://img.shields.io/npm/v/pareto-chart.svg)](https://www.npmjs.com/package/pareto-chart) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>

![paretochart](https://user-images.githubusercontent.com/43149895/54027917-f942c500-4181-11e9-96d4-9bce88bca5d5.gif)

## Install

```bash
npm install --save pareto-chart
```

## Usage

```jsx
import React, { Component } from 'react'

import ParetoChart from 'pareto-chart'

class Example extends Component {
  render () {
    return (
        <ParetoChart
          width={100}
          height={50}
          lineLabel='Cumulative percentage'
          data={{
            'Customer complaints': {
              'Dificult parking': 40,
              'Rude sales person': 13,
              'Poor lighting': 10,
              'Confusing layout': 27,
              'Limmited sizes': 15
            },
            'Complaints about documents ': {
              'Certificate error': 20,
              'Certificate missing': 40,
              'Invoice error': 10,
              'Packaging error': 5,
              'Wrong quantity': 3,
              'Others': 2
            },
            'Defects by discipline': {
              'Tests': 20,
              'Codification': 40,
              'Release': 10,
              'Analysis': 5,
              'Planning': 15
            }
          }} />
    )
  }
}
```

## License

MIT © [thiagoferrax](https://github.com/thiagoferrax)