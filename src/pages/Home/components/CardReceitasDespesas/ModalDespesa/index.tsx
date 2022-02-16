import React, { SyntheticEvent, useEffect, useState } from 'react'

import Button from '../../../../../components/Button'
import Input from '../../../../../components/Input'
import Modal from '../../../../../components/Modal'
import Select, { ListItem } from '../../../../../components/Select'
import ToastNotification from '../../../../../components/ToastNotification'
import { useAuth } from '../../../../../contexts/Auth'
import { useMonetary } from '../../../../../contexts/Monetary'
import api from '../../../../../services/axios'
import {
  Form,
  ContainerInput,
  ContainerButton
} from './styles'
import { DespesaInfo } from './types'
import { IModalDespesaProps } from './types'

const ModalDespesa = (props: IModalDespesaProps) => {
  const { close, id, modeEdition } = props

  const { adicionarDespesa, editarDespesa } = useMonetary()
  const { userLogged: { user } } = useAuth()

  const [registration, setRegistration] = useState<DespesaInfo>(new DespesaInfo())
  const [loading, setLoading] = useState(false)
  const [categorias] = useState<ListItem[]>([
    { key: 0, value: 'Sobrevivência' },
    { key: 1, value: 'Cultura' },
    { key: 2, value: 'Extra/Imprevisto' },
    { key: 3, value: 'Opcionais' }
  ])

  const buscarInfoDespesa = async () => {
    try {
      const req = {
        id: id,
        email: 'gabriel@email.com'
      }
      const response = await api.post('/route/expense.php?operation=f', req)
      if (response) {
        setRegistration({
          ...response.data[0]
        })
      }
    } catch {

    }
  }

  useEffect(() => {
    if (modeEdition && id) {
      buscarInfoDespesa()
    }
  }, [modeEdition])

  const addDespesa = async (e: SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const req: DespesaInfo = {
        ...registration,
        email: user.email
      }

      const response = await api.post('/route/expense.php?operation=c', req)

      if (response.status) {
        const categoria = categorias.find(categoria => categoria.key === req.category)?.value
        adicionarDespesa({ ...registration, id: response.data.id, category: categoria || '' })
        ToastNotification({
          id: `error-${id}`,
          content: 'Despesa adicionada com sucesso'
        })
        close()
      }
    } catch {
      ToastNotification({
        id: 'error',
        content: 'Não foi possível adcionar essa despesa'
      })
    }
    setLoading(false)
  }

  const editDespesa = async (e: SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)

    if (id) {
      try {
        const req = {
          ...registration,
          id,
          email: 'gabriel@email.com'
        }

        const response = await api.post('/route/expense.php?operation=u', req)

        if (response.status) {
          const categoria = categorias.find(categoria => categoria.key === req.category)?.value
          editarDespesa({ ...req, category: categoria || '' })
          close()
        }
      } catch {
        ToastNotification({
          id: 'error',
          content: 'Não foi possível editar essa despesa'
        })
      }
    }

    setLoading(false)
  }

  const onEnterDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      if (modeEdition) editDespesa(event)
      else addDespesa(event)
    }
  }

  return (
    <Modal
      closeModal={close}
      title={modeEdition ? 'Editar Despesa' : 'Adicionar Despesa'}
    >
      <Form onSubmit={(e) => modeEdition ? editDespesa(e) : addDespesa(e)} onKeyPress={onEnterDown}>
        <ContainerInput>
          <Input
            label="Descrição: "
            name="description"
            type="text"
            value={registration.description}
            onChange={(e) => setRegistration({ ...registration, description: e.target.value })}
            required
          />
        </ContainerInput>
        <ContainerInput>
          <Input
            label="Custo (em R$): "
            name="value"
            type="text"
            value={registration.value}
            onChange={(e) => {
              const value = Number(e.target.value)
              if (value) setRegistration({ ...registration, value: value })
            }
            }
            required
          />
        </ContainerInput>
        <ContainerInput>
          <Select
            label="Categoria"
            value={registration.category}
            onChange={(e) => setRegistration({ ...registration, category: Number(e.target.value) })}
            listItems={categorias}
            required
          />
        </ContainerInput>
        <ContainerInput>
          <Input
            label="Data de Pagamento: "
            name="payment_date"
            type="date"
            value={registration.payment_date}
            onChange={(e) => setRegistration({ ...registration, payment_date: e.target.value })}
            required
          />
        </ContainerInput>
        <ContainerInput>
          <Input
            label="Data de Vencimento: "
            name="due_date"
            type="date"
            value={registration.due_date}
            onChange={(e) => setRegistration({ ...registration, due_date: e.target.value })}
            required
          />
        </ContainerInput>
        <ContainerButton>
          <Button onClick={close} text="Cancelar" color="#b5b5b5"/>
          <Button loading={loading} text={modeEdition ? 'Editar despesa' : 'Adicionar despesa'}/>
        </ContainerButton>
      </Form>
    </Modal>
  )
}

export default ModalDespesa
