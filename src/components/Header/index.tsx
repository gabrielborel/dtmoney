import { SetStateAction, useLayoutEffect } from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { Container, Content, SunIcon, MoonIcon } from './styles';
import { lightTheme, darkTheme } from '../../styles/themes';

interface Theme {
  [x: string]: string;
}

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
  setTheme: React.Dispatch<SetStateAction<Theme>>;
  theme: Theme;
}

export const Header = ({
  onOpenNewTransactionModal,
  setTheme,
  theme,
}: HeaderProps) => {
  useLayoutEffect(
    () =>
      setTheme(
        JSON.parse(localStorage.getItem('theme') as string) === 'dark'
          ? darkTheme
          : lightTheme
      ),
    [setTheme]
  );

  return (
    <Container>
      <Content>
        <Logo />
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          {theme.type === 'dark' ? (
            <SunIcon
              onClick={() => {
                setTheme(lightTheme);
                localStorage.setItem('theme', JSON.stringify('light'));
              }}
            />
          ) : (
            <MoonIcon
              onClick={() => {
                setTheme(darkTheme);
                localStorage.setItem('theme', JSON.stringify('dark'));
              }}
            />
          )}
          <button type='button' onClick={onOpenNewTransactionModal}>
            Nova transação
          </button>
        </div>
      </Content>
    </Container>
  );
};
