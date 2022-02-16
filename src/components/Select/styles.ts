import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  > span {
    font-size: 12px;
    color: ${props => props.theme.red};
    margin-top: 4px;
  }
`

export const Label = styled.label<{error: boolean | undefined}>(({ color, theme, error }) => `
  padding-bottom: 8px;
  font-size: 14px;
  color: ${error ? theme.red : theme.black};
`)

export const Select = styled.select<{error: boolean | undefined}>(({ theme, disabled, error }) => `
  padding: 14px 16px;
  border-radius: 4px;
  background-color: ${disabled ? theme.gray2 : 'transparent'};
  border: 1px solid ${error ? theme.red : theme.gray3};
  outline-color: ${theme.primary};
  color: ${theme.black};

`)

export const Option = styled.option`
`
