import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const Label = styled.label(({ color, theme }) => `
  padding-bottom: 8px;
  font-size: 14px;
  color: ${theme.black};
`)

export const Select = styled.select(({ theme, disabled }) => `
  padding: 14px 16px;
  border-radius: 4px;
  background-color: ${disabled ? theme.gray2 : 'transparent'};
  border: 1px solid ${theme.gray3};
  outline-color: ${theme.primary};
  color: color: ${theme.gray3};

  > option {
    padding: 16px;
  }
`)

export const Option = styled.option`
`
