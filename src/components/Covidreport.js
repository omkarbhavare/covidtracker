import React from 'react'

import Card from './Card';

const Covidreport = (props) => {

    const {
        totalConfirmed,
        totalRecovered,
        totalDeath,
        country
    } = props;



    return (
        <div><div>
            <div>
                <h1>{country === '' ? 'World Wide Covid Report' : country.toUpperCase()}</h1>
                <div className='card-style'>
                    <Card>
                        <span>Total Confirmed</span> <br />
                        <span>{props.totalConfirmed}</span>
                    </Card>
                    <Card>
                        <span>Total Recovered</span> <br />
                        <span>{props.totalRecovered}</span>
                    </Card>
                    <Card>
                        <span>Total Death</span> <br />
                        <span>{props.totalDeath}</span>
                    </Card>
                </div>
            </div>
        </div></div>
    )
}

export default Covidreport