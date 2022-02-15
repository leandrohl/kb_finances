import React, { ReactNode } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

import * as S from './styles'

interface ModalProps {
  children: ReactNode,
  closeModal?(): void,
  title?: string,
}

const Modal: React.FC<ModalProps> = ({ children, closeModal, title }) => (
  <S.Container>
    <S.Content>
      <S.Header>
        <h3>{title}</h3>
        {closeModal && (
          <AiOutlineClose aria-label="fechar modal" onClick={() => closeModal()} />
        )}
      </S.Header>
      {children}
    </S.Content>
  </S.Container>
)

export default Modal
