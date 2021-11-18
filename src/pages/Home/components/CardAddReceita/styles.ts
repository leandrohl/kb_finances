import styled from "styled-components";

export const Container = styled.div`
    background:  rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ContainerCard = styled.div`
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    width: 400px;
    max-width: 1000px;
    border-radius: 5px;
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
    text-align: center;
    position: relative;
`

export const ContainerTitle = styled.div`
    padding: 20px;
    font-weight: bold;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 24px;
`

export const ContainerInput = styled.div`
    display: flex;
    padding: 8px 0;
    text-align: start;
    justify-content: center;
    align-items: center;

    div {
      width: 100%;
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