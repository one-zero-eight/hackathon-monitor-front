import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PrometheusChart = ({ data }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (data) {
            if (chartInstanceRef.current) {
                // If a chart instance exists, destroy it before creating a new one.
                chartInstanceRef.current.destroy();
            }

            const timestamps = data[0].values.map((value) => value[0]);
            const values = data[0].values.map((value) => parseFloat(value[1]));

            const ctx = chartRef.current.getContext('2d');

            chartInstanceRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: timestamps,
                    datasets: [
                        {
                            label: 'Prometheus Data',
                            data: values,
                            fill: false,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            tension: 0.1,
                        },
                    ],
                },
                options: {
                    scales: {
                        x: [
                            {
                                type: 'linear',
                                position: 'bottom',
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Timestamp',
                                },
                            },
                        ],
                        y: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Value',
                                },
                            },
                        ],
                    },
                },
            });
        }
    }, [data]);

    return (
        <div>
            <canvas ref={chartRef} />
        </div>
    );
};

export default PrometheusChart;
