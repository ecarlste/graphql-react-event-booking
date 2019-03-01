import { Bar } from 'react-chartjs';
import React from 'react';
import _ from 'lodash';

import './BookingChart.css';

const bookingBucketLimits = {
    'Cheap': {min: 0, max: 100},
    'Normal': {min: 100, max: 200},
    'Expensive': {min: 200, max: Number.MAX_VALUE}
};

const bookingChart = props => {
    let chartLabels = [];
    let chartDatasetData = [];

    for (const bucket in bookingBucketLimits) {

        const filteredBookings = props.bookings.reduce((prev, current) => {
            const price = current.event.price;
            const min = bookingBucketLimits[bucket].min;
            const max = bookingBucketLimits[bucket].max;

            return _.inRange(price, min, max)  ? prev + 1 : prev;
        }, 0);

        chartLabels.push(bucket);
        chartDatasetData.push(filteredBookings);
        
    }

    const chartData = {
        labels: chartLabels,
        datasets: [{
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: chartDatasetData
        }]
    };

    console.log(chartData);

    return <Bar data={chartData} />
};

export default bookingChart;
