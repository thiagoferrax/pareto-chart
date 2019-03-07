# pareto-chart

> Get a pareto chart that can be used as a react component.

[![NPM](https://img.shields.io/npm/v/pareto-chart.svg)](https://www.npmjs.com/package/pareto-chart) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![pareto](https://user-images.githubusercontent.com/43149895/53968848-83cdea80-40d6-11e9-99c1-de9b27c6b232.png)

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
    )
  }
}
```

## License

MIT © [thiagoferrax](https://github.com/thiagoferrax)
