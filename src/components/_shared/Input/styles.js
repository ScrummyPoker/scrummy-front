import styled, { css } from 'styled-components';

export const Container = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  color: #7a7a80;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f2f2fa;
    margin-right: 3px;
    padding: 20px;
    height: 56px;
  }

  input {
    color: #7a7a80;
    background: #f2f2fa;
    padding: 20px;
    border: 0;
    flex: 1;
    height: 56px;

    &::placeholder {
      color: #aeaeb3;
    }

    ${props =>
    props.isFilled &&
    css`
        color: #000;
        &::placeholder {
          color: #000;
        }
      `};
    ${props =>
    props.isErrored &&
    css`
        color: #c53030;
        &::placeholder {
          color: #c53030;
        }
      `};
    ${props =>
    props.isFocused &&
    css`
        color: #7a7a80;
        &::placeholder {
          color: #aeaeb3;
        }
      `};
  }

  ${props =>
    props.isFilled &&
    css`
      color: #000;
    `};
  ${props =>
    props.isErrored &&
    css`
      color: #c53030;
    `};
  ${props =>
    props.isFocused &&
    css`
      color: #7a7a80;
    `};

  & + div {
    margin-top: 8px;
  }
`;
