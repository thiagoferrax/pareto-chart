import React, { Component } from 'react'
import Grid from '../layout/grid'
import { Bar } from 'react-chartjs-2'
import './paretoChart.css'

const INITIAL_STATE = { data: undefined }

export default class ParetoChart extends Component {
    constructor(props) {
        super(props)
        this.state = INITIAL_STATE
    }

    componentWillMount() {

        const data = Object.entries(this.props.data).sort((a, b) => b[1] - a[1]).reduce((ordered, entry) =>    {
            ordered[entry[0]] = entry[1]
            return ordered
        }, {})

        this.setState({ data })
    }

    componentWillReceiveProps(nextProps) {
    }

    getChartData(data) {
        const total = this.getMaxYAxisValue(data)
        const labels = Object.keys(data)
        const barDataset = Object.values(data).reduce((set, e) => {
            set.data.push(e)
            return set
        }, { label: this.props.yLabel, data: [], borderWidth: 2, backgroundColor: 'rgb(0, 192, 239, .3)', borderColor: 'rgb(0, 192, 239)' })

        let before = 0
        const lineData = barDataset.data.map(d => {
            const sum = (100*d/total) + before
            before = sum
            return parseFloat(sum).toFixed(3)
        })

        const lineDataset = {
            yAxisID: 'B',
            label: 'Line', 
            data: lineData, 
            type: 'line', 
            borderWidth: 2, 
            backgroundColor: 'transparent', 
            borderColor: 'rgb(51, 51, 51, 0.5)'
        }


        return { labels, datasets: [barDataset, lineDataset] }
    }

    getMaxYAxisValue(data) {
        const maxYAxisValue = Object.values(data).reduce((sum, e) => {
            sum += e
            return sum
        }, 0)

        return maxYAxisValue
    }

    render() {
        if (!this.state.data) {
            return <React.Fragment></React.Fragment>
        }

        const chartData = this.getChartData(this.state.data)

        const maxYAxisValue = this.getMaxYAxisValue(this.state.data)

        return (
            <Grid cols={this.props.cols}>
                <div className="paretoChart">
                    <Bar
                        data={chartData}
                        options={{
                            legend: {
                                position: 'right',
                            },
                            scales: {
                                xAxes: [{
                                    gridLines: {
                                        display: false
                                    }
                                }],

                                yAxes: [{
                                    id: 'A',
                                    type: 'linear',
                                    position: 'left',
                                    gridLines: {
                                        display: false
                                    },
                                    ticks: {
                                        min: 0,
                                        max: maxYAxisValue
                                    }
                                }, {
                                    id: 'B',
                                    type: 'linear',
                                    position: 'right',
                                    gridLines: {
                                        display: false
                                    },
                                    ticks: {
                                        min: 0,
                                        max: 100,
                                        callback: function(value, index, values) {
                                            return value+'%'
                                        }
                                    }
                                }]
                            }
                        }}
                    />
                </div>
            </Grid >
        )
    }
}