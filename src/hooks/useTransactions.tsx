import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  category: string;
  amount: number;
  type: string;
  created_at: Date;
}

type TransactionInput = Omit<Transaction, 'id' | 'created_at'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<{}>;
  isLoading: boolean;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);
TransactionsContext.displayName = 'Transactions';

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const prevTransactions =
      JSON.parse(localStorage.getItem('tasks') as string) || [];

    api.get('/transactions').then((response) => {
      const { transactions } = response.data;
      setTransactions([...transactions, ...prevTransactions]);
      setLoading(false);
    });
  }, []);

  const createTransaction = async (transaction: TransactionInput) => {
    const response = await api.post('/transactions', transaction);
    const { transaction: newTransaction } = response.data;

    setTransactions([
      ...transactions,
      {
        ...newTransaction,
        created_at: new Date(),
      },
    ]);

    return { ...newTransaction, created_at: new Date() };
  };

  return (
    <TransactionsContext.Provider
      value={{ transactions, createTransaction, isLoading }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);

  return context;
};
