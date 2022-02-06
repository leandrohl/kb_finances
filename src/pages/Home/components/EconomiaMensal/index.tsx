import React, { useState } from 'react';

// import { Container } from './styles';
import { Chart } from "react-google-charts";

const EconomiaMensal: React.FC = () => {
    const [options, setOptions] = useState({
        title: ''
    })
    const [data, setData] = useState([
        ['Linguagens', 'Quantidade'],
        ['React', 100],
        ['Angula', 80],
        ['Vue', 50],
    ])

    return (
        <div>
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                data={data}
                options={options}
            />
        </div>
    );
}

export default EconomiaMensal;