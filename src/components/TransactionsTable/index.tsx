import { Container } from './styles';
import { ReactComponent as LoadingImg } from '../../assets/loading-circle.svg';
import { useTransactions } from '../../hooks/useTransactions';

export const TransactionsTable = () => {
  const { transactions, isLoading } = useTransactions();

  return (
    <>
      {isLoading ? (
        <div style={{ marginTop: '200px' }}>
          <LoadingImg />
        </div>
      ) : (
        <Container>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Valor</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(
                ({ title, type, category, amount, created_at, id }) => {
                  console.log(created_at);
                  return (
                    <tr key={id} data-aos='zoom-in'>
                      <td>{title}</td>
                      <td className={type}>
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(amount)}
                      </td>
                      <td>{category}</td>
                      <td>
                        {new Intl.DateTimeFormat('pt-BR').format(
                          new Date(created_at)
                        )}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </Container>
      )}
    </>
  );
};
