import styled from 'styled-components'

export const Container = styled.header`
    width: 100%;
    background: #835DAA;
    text-align: center;
`

export const ContainerMenu = styled.div`
    padding-top: 16px;
    display: flex;
    justify-content: space-between;
`

export const Data = styled.span`
    display: flex;
    justify-content: space-between;
    border: solid 2px ${(props) => props.theme.white};;
    color: ${(props) => props.theme.white};;
    border-radius: 32px;
    font-size: 16px;
    font-weight: 500;
    padding: 0 4px;
    width: 200px;
`

export const Logout = styled.button`
    color: ${(props) => props.theme.white};
    font-size: 12px;
    margin-right: 16px;
    border: solid 2px ${(props) => props.theme.white};;
    padding: 4px 4px;
    border-radius: 32px;
    background: transparent;
`

export const ContainerInfos = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    padding: 16px 0;

    @media(max-width: 480px) {
        flex-direction: column;
    }
`

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 4%;
    color: #FFFFFF;
    > h1{
        margin: 0;
    }
`

export const Icon = styled.div`
    background-color: ${(props) => props.color};
    margin-top: 24px;
    padding: 16px 16px 12px 16px;
    border-radius: 50%;
`
