import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { ReactComponent as CloseImg } from '../../assets/close.svg';
import { ReactComponent as IncomeImg } from '../../assets/income.svg';
import { ReactComponent as OutcomeImg } from '../../assets/outcome.svg';
import { useState, FormEvent } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  theme: string | 'dark' | 'light';
}

export const NewTransactionModal = ({
  isOpen,
  onRequestClose,
  theme,
}: NewTransactionModalProps) => {
  const { createTransaction } = useTransactions();

  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');

  const handleCreateNewTransaction = async (event: FormEvent) => {
    event.preventDefault();

    if (!title || !amount || !category || !type) return;

    const newTransaction = await createTransaction({
      title,
      amount,
      category,
      type,
    });

    onRequestClose();
    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');
    toast.success('Transação cadastrada !', {
      position: 'top-center',
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme === 'dark' ? 'dark' : 'light',
    });

    const prevTransactions =
      JSON.parse(localStorage.getItem('tasks') as string) || [];
    localStorage.setItem(
      'tasks',
      JSON.stringify([...prevTransactions, newTransaction])
    );
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
      >
        <button
          type='button'
          onClick={onRequestClose}
          className='react-modal-close'
        >
          <CloseImg />
        </button>

        <Container onSubmit={handleCreateNewTransaction}>
          <h2>Cadastrar transação</h2>

          <input
            placeholder='Título'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <input
            type='number'
            placeholder='Valor'
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value))}
          />

          <TransactionTypeContainer>
            <RadioBox
              type='button'
              isActive={type === 'deposit'}
              activeColor='green'
              onClick={() => setType('deposit')}
            >
              <IncomeImg />
              <span>Entrada</span>
            </RadioBox>
            <RadioBox
              type='button'
              isActive={type === 'withdraw'}
              activeColor='red'
              onClick={() => setType('withdraw')}
            >
              <OutcomeImg />
              <span>Saída</span>
            </RadioBox>
          </TransactionTypeContainer>

          <input
            placeholder='Categoria'
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />

          <button type='submit'>Cadastrar</button>
        </Container>
      </Modal>
    </>
  );
};
