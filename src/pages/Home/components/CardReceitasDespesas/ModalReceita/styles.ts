import styled from 'styled-components'

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 24px;
`

export const Container = styled.div`
    display: flex;
    padding: 8px 0;
    text-align: start;
    justify-content: center;
    align-items: end;

    div {
      width: 100%;
    }

    button {
      height: 48px;
      font-size: 12px;
      margin-left: 8px;
    }
`

export const ContainerButton = styled.div`
    display: flex;
    padding: 8px 0;
    justify-content: center;
    button {
        margin: 10px 4px;
        width: 200px;
        cursor: pointer;
        padding: 8px 0;
    }
`
