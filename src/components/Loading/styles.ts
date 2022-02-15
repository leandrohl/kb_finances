import styled from 'styled-components'

export const ContainerLoading = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  background-color:  rgb(0 0 0 / 80%);;
  z-index: 9999;
`

export const LoadingSpin = styled.div`
  width: 280px;
  height: 280px;

  border: 16px solid rgba(0, 0, 0, .1);
  border-left-color: #483B8A;

  margin-bottom: 8px;

  border-radius: 50%;

  animation: spin 1.5s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg)}
  }
`
