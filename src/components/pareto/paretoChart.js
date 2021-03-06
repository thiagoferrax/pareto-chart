import React, { Component } from 'react'
import Grid from '../layout/grid'
import { Bar } from 'react-chartjs-2'
import memoize from 'memoize-one'
import './paretoChart.css'

const INITIAL_STATE = { index: 0 }

export default class ParetoChart extends Component {
    constructor(props) {
        super(props)
        this.state = INITIAL_STATE
    }

    shouldComponentUpdate(nextProps, nextState) {
        let changed = false
        for (const index in nextProps) {
            if (JSON.stringify(nextProps[index]) !== JSON.stringify(this.props[index])) {
                changed = true
            }
        }

        if(this.state.index !== nextState.index) {
            changed = true
        }
        return changed
    }

    componentWillUpdate(nextProps, nextState) {
        if(!Object.keys(nextProps.data)[nextState.index]) {
            this.selectDataset(0)
        }
    }

    sortData(data) {
        const orderedData = Object.entries(data).sort((a, b) => b[1] - a[1]).reduce((ordered, entry) => {
            ordered[entry[0]] = entry[1]
            return ordered
        }, {})
        return orderedData
    }

    getChartColor = (index) => {

        const colors = [
            'rgb(0, 192, 239, .4)',
            'rgb(216, 27, 96, .4)',
            'rgb(104,115,140, .4)',
            'rgb(48, 187, 187, .4)',
            'rgb(11, 120, 206, .4)',
            'rgb(255, 119, 1, .4)',
            'rgb(17, 17, 17, .4)',
            'rgb(96, 92, 168, .4)'

        ]

        if (index > colors.length) {
            index -= colors.length
        }
        return colors[index]
    }

    getChartBorderColor = (index) => {
        const colors = [
            'rgb(0, 192, 239)',
            'rgb(216, 27, 96)',
            'rgb(104,115,140)',
            'rgb(48, 187, 187)',
            'rgb(11, 120, 206)',
            'rgb(255, 119, 1)',
            'rgb(17, 17, 17)',
            'rgb(96, 92, 168)'
        ]

        if (index > colors.length) {
            index -= colors.length
        }
        return colors[index]
    }

    getSelectedLegend(data, index) {
        return Object.keys(data)[index]
    }

    getSortedData = memoize((data, index) => {
        const selectedLegend = this.getSelectedLegend(data, index)
        return this.sortData(data[selectedLegend])
    })

    getChartData(data) {
        const total = this.getMaxYAxisValue(data)
        const labels = Object.keys(data)
        const barDataset = Object.values(data).reduce((set, e) => {
            set.data.push(e)
            return set
        }, {
                label: this.props.yLabel,
                data: [],
                borderWidth: 1.5,
                backgroundColor: this.getChartColor(this.state.index),
                borderColor: this.getChartBorderColor(this.state.index)
            })

        let before = 0
        const lineData = barDataset.data.map(d => {
            const sum = (100 * d / total) + before
            before = sum
            return parseFloat(sum).toFixed(3)
        })

        const lineDataset = {
            yAxisID: 'B',
            label: this.getLineLabel(),
            data: lineData,
            type: 'line',
            borderWidth: 1.5,
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

    datasetKeyProvider() { return Math.random() }

    getLineLabel() {
        return this.props.lineLabel || 'Cumulative percentage'
    }

    render() {
        const data = this.getSortedData(this.props.data, this.state.index)
        
        if (!data) {
            return <React.Fragment></React.Fragment>
        }

        const chartData = this.getChartData(data)

        const maxYAxisValue = this.getMaxYAxisValue(data)
        const lineLabel = this.getLineLabel()

        const options = {
            legend: {
                display: false
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
                        stepSize: 20
                    }
                }]
            }, 
            tooltips: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem, data) {
                        var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || ''
                        if(datasetLabel === lineLabel) {
                            return datasetLabel + ': ' + parseFloat(tooltipItem.yLabel).toFixed(1) + '%'
                        } else {
                            return datasetLabel + ': ' + tooltipItem.yLabel
                        }
                    }
                }
            }
        }

        return (
            <Grid cols={this.props.cols}>
                <div className="paretoChart_">
                    <div className="chart_">
                        <Bar
                            datasetKeyProvider={this.datasetKeyProvider}
                            width={this.props.width}
                            height={this.props.height}
                            data={chartData}
                            options={options}
                        />
                    </div>
                    <div className="legend_">
                        {this.getLegend()}
                    </div>
                </div>
            </Grid >
        )
    }

    selectDataset(index) {
        this.setState({ index })
    }

    getLegend() {
        const labels = Object.keys(this.props.data)

        const labelsDivs = labels.map((label, index) => {
            const labelClass = index === this.state.index ? 'label_' : 'labelLineThrough'
            const color = this.getColor(index)
            return (
                <div key={`labels_${label}_${index}`} className="legendLabel" onClick={() => this.selectDataset(index)}>
                    <div className={`labelSquare legend all ${color}_dark ${color}Border`} />
                    <div className={labelClass}>{label}</div>
                </div>
            )
        })

        return (
            <div className="legend">
                {labelsDivs}
            </div>
        )
    }

    getColor(index) {
        const colors = [
            'blue',
            'pink',
            'gray',
            'green',
            'blue_two',
            'orange',
            'black',
            'purple'
        ]

        if (index >= colors.length) {
            index -= colors.length
        }

        return colors[index]
    }
}