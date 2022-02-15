import React, { SyntheticEvent, useState } from 'react'

import Button from '../../../../../../components/Button'
import Input from '../../../../../../components/Input'
import Modal from '../../../../../../components/Modal'
import * as S from './styles'
interface IModalAddCategoria {
  adicionarCategoria: (event: SyntheticEvent, nome: string) => void;
  close: () => void;
}

const ModalAddCategoria: React.FC<IModalAddCategoria> = (props: IModalAddCategoria) => {
  const { adicionarCategoria, close } = props

  const [nomeCategoria, setNomeCategoria] = useState('')

  const onEnterDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      adicionarCategoria(event, nomeCategoria)
    }
  }

  return (
    <Modal
      closeModal={close}
      title='Adicionar categoria'
    >
      <S.Form
        onSubmit={(e) => adicionarCategoria(e, nomeCategoria)}
        onKeyPress={onEnterDown}
      >
        <S.Container>
          <Input
            label="Nome da categoria "
            name="description"
            type="text"
            value={nomeCategoria}
            onChange={(e) =>
              setNomeCategoria(e.target.value)
            }
            required
          />
          <Button
            text='Adicionar Categoria'
          />
        </S.Container>
      </S.Form>
    </Modal>
  )
}

export default ModalAddCategoria
