import React, { useState, useEffect } from 'react'

// import { Container } from './styles';
import { Chart } from 'react-google-charts'

import { useAuth } from '../../../../contexts/Auth'
import { useMonetary } from '../../../../contexts/Monetary'
import api from '../../../../services/axios'

const DespesaCategoria: React.FC = () => {
  const { userLogged: { user } } = useAuth()

  const [options, setOptions] = useState({
    pieHole: 0.5,
    pieSliceTextStyle: {
      color: 'black',
      fontName: 'Montserrat',
      fontSize: 10
    },
    colors: ['#c6d8f0', '#d8bfd8', '#ffb394', '#ccff99'],
    fontName: 'Montserrat'
  })
  const [data, setData] = useState([
    ['Categoria', 'Valor'],
    ['Sobrevivencia', ''],
    ['Cultura', ''],
    ['Extra/Imprevisto', ''],
    ['Opcionais', '']
  ])

  // useEffect(() => {
  //   const teste = despesas.map(despesa => {
  //     switch(despesa.category) {
  //       case 0: []
  //       case 1:
  //       case 2:
  //       case 3:
  //     }
  //   })
  // }, [despesas])

  const buscarDespesaPorCategoria = async () => {
    try {
      const req = {
        email: user.email
      }

      const response = await api.post('/route/expense.php?operation=pc', req)
      if (response) {
        setData([
          ['Categoria', 'Valor'],
          ...response.data.map((despesa: any) => {
            return [despesa.category, Number(despesa.value)]
          })
        ])
      }
    } catch {

    }
  }

  useEffect(() => {
    buscarDespesaPorCategoria()
  }, [])

  return (
    <div>
      <h3>Despesa por categoria</h3>
      <Chart
        width={'100%'}
        height={'300px'}
        chartType="PieChart"
        data={data}
        options={options}
      />
    </div>
  )
}

export default DespesaCategoria
