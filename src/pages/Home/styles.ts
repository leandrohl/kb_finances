import styled from 'styled-components'

export const Container = styled.div.attrs({
  className: 'customScroll'
})`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #00000010;

`

export const Section = styled.div.attrs({
  className: 'customScroll'
})`
    width: 80%;
    background: #FFFFFF;
    border-radius: 8px;
    margin: 20px 0;
    padding: 16px 32px;

`
