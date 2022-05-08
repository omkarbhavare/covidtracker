import React from 'react'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto'


//Got the data from chart js documentation (Basic Setup)

const Graph = (props) => {
    return (
        <div className='graph-section' >
            
            <Line className='graph'
             data={{
                //X-Axis
                labels: props.label.map(l => l.substr(0,10)),
                datasets:[
                    {
                        label:'Cases',
                        fill:false,
                        lineTension:0.1,
                        backgroundColor:'rgba(75,192,192,0.4)',
                        borderColor:'yellow',
                        borderCapStyle:'butt',
                        borderDash:[],
                        borderJoinStyle:'miter',
                        pointBackgroundColor:'',
                        pointBorderColor:'blue',
                        pointBorderWidth:1,
                        pointHoverRadius:5,
                        pointHoverBackgroundColor:'green',
                        pointHoverBorderColor:'rgba(220,220,220,1)',
                        pointRadius:2,
                        pointHitRadius:10,
                        data:props.yAxis  //Setting up YAxis 
                    }
                ]
            }} />
        </div>
    )
}

export default Graph