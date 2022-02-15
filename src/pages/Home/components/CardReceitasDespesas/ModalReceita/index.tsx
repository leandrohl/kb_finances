import React, { SyntheticEvent, useEffect, useState } from 'react'

import Button from '../../../../../components/Button'
import Input from '../../../../../components/Input'
import Modal from '../../../../../components/Modal'
import Select, { ListItem } from '../../../../../components/Select'
import ToastNotification from '../../../../../components/ToastNotification'
import { useAuth } from '../../../../../contexts/Auth'
import { useMonetary } from '../../../../../contexts/Monetary'
import api from '../../../../../services/axios'
import ModalAddCategoria from './ModalAddCategoria'
import {
  Form,
  Container,
  ContainerButton
} from './styles'
import { ReceitaInfo, ReceitaError } from './types'
import { IModalReceitaProps } from './types'

const ModalReceita = (props: IModalReceitaProps) => {
  const { close, modeEdition, id } = props
  const { userLogged: { user } } = useAuth()

  const { adicionarReceita, editarReceita } = useMonetary()

  const [registration, setRegistration] = useState<ReceitaInfo>(
    new ReceitaInfo()
  )
  const [loading, setLoading] = useState(false)
  const [openModalAddCategoria, setOpenModalAddCategoria] = useState(false)
  const [categorias, setCategorias] = useState<ListItem[]>([])

  useEffect(() => {
    buscarCategoriasReceita()
  }, [])

  useEffect(() => {
    if (modeEdition && id) {
      buscarInfoReceita()
    }
  }, [modeEdition])

  const buscarInfoReceita = async () => {
    try {
      const req = {
        id: id,
        email: user.email
      }
      const response = await api.post('/route/income.php?operation=f', req)
      if (response) {
        setRegistration(response.data[0])
      }
    } catch {}
  }

  const buscarCategoriasReceita = async () => {
    try {
      const req = {
        email: user.email
      }
      const response = await api.post('/route/income.php?operation=get_categories', req)
      if (response) {
        const categoriasLista = response.data.map((categoria: any) => {
          return {
            key: categoria.id,
            value: categoria.category
          }
        })
        setCategorias(categoriasLista)
      }
    } catch {}
  }

  const addCategoria = async (e: SyntheticEvent, nomeCategoria: string) => {
    e.preventDefault()

    try {
      const req = {
        email: user.email,
        category: nomeCategoria
      }

      const response = await api.post('/route/income.php?operation=set_category', req)

      if (response.status) {
        ToastNotification({
          id: 'success',
          content: 'Categoria adicionada com sucesso'
        })
        closeModalAdicionarCategoria()
        buscarCategoriasReceita()
      }
    } catch {}
  }

  const validarCampos = (register: ReceitaInfo) => {
    const keys: string[] = Object.keys(register)
    const values: string[] = Object.values(register)

    let error = new ReceitaError()

    keys.forEach((key: string, index: number) => {
      if (!values[index]) {
        error = {
          ...error,
          [key]: 'Campo obrigatório'
        }
        console.log(error)
      }
    })

    setRegistration({ ...registration, error })
  }

  const addReceita = async (e: SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)

    validarCampos(registration)

    try {
      const req = {
        ...registration,
        email: user.email
      }

      const response = await api.post('/route/income.php?operation=c', req)

      if (response.status) {
        adicionarReceita({ ...registration, id: response.data.id })
        ToastNotification({
          id: 'alert',
          content: 'Receita adicionada com sucesso'
        })
        close()
      }
    } catch {}
    setLoading(false)
  }

  const editReceita = async (e: SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)

    if (id) {
      try {
        const req = {
          ...registration,
          id,
          email: user.email
        }

        const response = await api.post('/route/income.php?operation=u', req)

        if (response.status) {
          editarReceita(req)
          close()
        }
      } catch {}
    }

    setLoading(false)
  }

  const closeModalAdicionarCategoria = () => {
    setOpenModalAddCategoria(false)
  }

  return (
    <Modal
      closeModal={close}
      title={modeEdition ? 'Editar Receita' : 'Adicionar Receita'}
    >
      <Form>
        <Container>
          <Input
            label="Descrição: "
            name="description"
            type="text"
            value={registration.description}
            onChange={(e) =>
              setRegistration({ ...registration, description: e.target.value })
            }
            error={!!registration.error.description}
            labelError={registration.error.description}
            required
          />
        </Container>
        <Container>
          <Input
            label="Custo (em R$): "
            name="value"
            type="text"
            value={registration.value}
            onChange={(e) => {
              const value = Number(e.target.value)
              if (value) setRegistration({ ...registration, value: value })
            }}
            error={!!registration.error.value}
            labelError={registration.error.value}
            required
          />
        </Container>
        <Container>
          <Select
            label="Categoria"
            value={registration.category}
            onChange={(e) =>
              setRegistration({
                ...registration,
                category: Number(e.target.value)
              })
            }
            error={!!registration.error.category}
            labelError={registration.error.category}
            listItems={categorias}
            required
          />
        </Container>
        <Container>
          <Input
            label="Data de Recebimento: "
            name="receipt_date"
            type="date"
            value={registration.receipt_date}
            onChange={(e) =>
              setRegistration({ ...registration, receipt_date: e.target.value })
            }
            error={!!registration.error.receipt_date}
            labelError={registration.error.receipt_date}
            required
          />
        </Container>
        <ContainerButton>
          <Button onClick={close} text="Cancelar" color="#b5b5b5"/>
          <Button text='Adicionar categoria' onClick={() => setOpenModalAddCategoria(true)}/>
          <Button
            loading={loading}
            text={modeEdition ? 'Editar' : 'Adicionar'}
            onClick={(e) => (modeEdition ? editReceita(e) : addReceita(e))}
          />
        </ContainerButton>
      </Form>
      {openModalAddCategoria && <ModalAddCategoria close={closeModalAdicionarCategoria} adicionarCategoria={(e, nomeCategoria) => addCategoria(e, nomeCategoria)} />}
    </Modal>
  )
}

export default ModalReceita
