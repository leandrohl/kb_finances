import styled from 'styled-components';

export const Container = styled.div`
`;

export const BodyContainer = styled.div`
    width: 100%;
    background-color: #00000010;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ButtonsAdd = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 0;
`;

export const Button = styled.button`
    margin: 0 32px;
    padding: 16px 32px;
    font-size: 16px;
    font-weight: 600;
    border: 0;
    color: #FFFFFF;
    border-radius: 16px;
    cursor: pointer;
    background: ${(props) => props.color};
    
`;

export const Movimentacoes = styled.div`
    display: flex;
    justify-content: center;
    padding: 16px 0;
    width: 80%;
`;

export const CardMovimentacao = styled.div`
    height: 400px;
    width: 100%;
    background: #FFFFFF;
    margin: 0px 16px;
    border-radius: 8px;
    
    padding: 16px 32px;
    overflow-y: auto;
    h3{
        padding: 8px 0;
    }
`;

export const ContainerMovimentacao = styled.div`
    display: flex;
    justify-content:space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    margin: 8px 0;
`;

export const Category = styled.div`
    padding: 4px;
    border: 1px solid ${(props) => props.color};
    border-radius: 20px;
    font-size: 12px;
`;

export const Info = styled.div`
    display:flex;
    flex-direction: column;
`


export const CardHorizontal = styled.div`
    width: 80%;
    background: #FFFFFF;
    margin: 16px 0;
    border-radius: 8px;
    
    padding: 16px 32px;
    overflow-y: auto;
    h3{
        padding: 8px 0;
    }
    img{
        height: 90%;
    }
`;
