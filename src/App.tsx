import { useState } from 'react';
import Modal from 'react-modal';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionModal } from './components/NewTransactionModal';
import { GlobalStyle } from './styles/global';
import { TransactionsProvider } from './hooks/useTransactions';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();
Modal.setAppElement('#root');

interface Theme {
  [key: string]: string;
}

export const App = () => {
  const [theme, setTheme] = useState<Theme>({});
  const [isNewTransactionModalOpen, setNewTransactionModalOpen] =
    useState(false);

  const handleOpenNewTransactionModal = () => setNewTransactionModalOpen(true);
  const handleCloseNewTransactionModal = () =>
    setNewTransactionModalOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <TransactionsProvider>
        <Header
          onOpenNewTransactionModal={handleOpenNewTransactionModal}
          setTheme={setTheme}
          theme={theme}
        />

        <Dashboard />

        <NewTransactionModal
          isOpen={isNewTransactionModalOpen}
          onRequestClose={handleCloseNewTransactionModal}
          theme={theme.type}
        />

        <GlobalStyle />

        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </TransactionsProvider>
    </ThemeProvider>
  );
};
