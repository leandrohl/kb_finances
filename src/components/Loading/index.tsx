import React from 'react'

import * as S from './styles'
interface ILoadingProps {
  frase?: string;
  show: boolean;
}

const Loading: React.FC<ILoadingProps> = (props: ILoadingProps) => {
  const { show } = props

  const renderLoading = () => (
    <S.ContainerLoading>
      <S.LoadingSpin />
    </S.ContainerLoading>
  )

  return <>{show && renderLoading()}</>
}

export default Loading
