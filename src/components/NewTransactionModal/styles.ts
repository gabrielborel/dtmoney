import styled from 'styled-components';
import { darken, lighten, transparentize } from 'polished';

export const Container = styled.form`
  h2 {
    color: ${({ theme }) => theme.textTitle};
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 100%;
    height: 4rem;

    padding: 0 1.5rem;
    border-radius: 0.25rem;

    background: ${({ theme }) => theme.input};
    border: 1px solid ${({ theme }) => darken(0.1, theme.input)};

    color: ${({ theme }) => theme.textTitle};

    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: ${({ theme }) => theme.textTitle};
    }

    & + input {
      margin-top: 1rem;
    }
  }

  button[type='submit'] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background: ${({ theme }) => theme.green};
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    color: white;
    font-weight: 600;
    letter-spacing: 1px;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const TransactionTypeContainer = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;

  button {
  }
`;

interface RadioBoxProps {
  isActive: boolean;
  activeColor: 'green' | 'red';
}

const colors = {
  green: '#33cc95',
  red: '#e52e4d',
};

export const RadioBox = styled.button<RadioBoxProps>`
  height: 4rem;
  border: ${({ isActive, activeColor, theme }) =>
    isActive
      ? `2px solid ${transparentize(0.8, colors[activeColor])}`
      : `1px solid ${theme.radioBoxBorder}`};

  border-radius: 0.25rem;

  background: ${({ isActive, activeColor }) =>
    isActive ? transparentize(0.9, colors[activeColor]) : 'transparent'};

  display: flex;
  align-items: center;
  justify-content: center;

  transition: border, border-color 0.1s;

  &:hover {
    border-color: ${lighten(0.1, '#343a40')};
  }

  img {
    width: 20px;
    height: 20px;
  }

  span {
    display: inline-block;
    margin-left: 1rem;
    font-size: 1rem;
    color: ${({ theme }) => theme.textTitle};
  }
`;
