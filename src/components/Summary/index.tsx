import { Container } from './styles';
import { ReactComponent as IncomeImg } from '../../assets/income.svg';
import { ReactComponent as OutcomeImg } from '../../assets/outcome.svg';
import { ReactComponent as TotalImg } from '../../assets/total.svg';
import { ReactComponent as LoadingBalls } from '../../assets/loading-balls2.svg';
import { useTransactions } from '../../hooks/useTransactions';

export const Summary = () => {
  const { transactions, isLoading } = useTransactions();

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'deposit') {
        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.widthdraws += transaction.amount;
        acc.total -= transaction.amount;
      }

      return acc;
    },
    {
      deposits: 0,
      widthdraws: 0,
      total: 0,
    }
  );

  return (
    <Container>
      <div data-aos='zoom-in'>
        <header>
          <p>Entradas</p>
          <IncomeImg />
        </header>
        {isLoading ? (
          <div style={{ width: 'fit-content', padding: '15px 0 0 0' }}>
            <LoadingBalls />
          </div>
        ) : (
          <strong>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(summary.deposits)}
          </strong>
        )}
      </div>
      <div data-aos='zoom-in'>
        <header>
          <p>Saídas</p>
          <OutcomeImg />
        </header>
        {isLoading ? (
          <div style={{ width: 'fit-content', padding: '15px 0 0 0' }}>
            <LoadingBalls />
          </div>
        ) : (
          <strong>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(summary.widthdraws)}
          </strong>
        )}
      </div>
      <div data-aos='zoom-in' className='highlight-background'>
        <header>
          <p>Total</p>
          <TotalImg />
        </header>

        {isLoading ? (
          <div
            style={{
              width: 'fit-content',
              padding: '15px 0 0 0',
              background: '#33cc95',
            }}
          >
            <LoadingBalls />
          </div>
        ) : (
          <strong>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(summary.total)}
          </strong>
        )}
      </div>
    </Container>
  );
};
