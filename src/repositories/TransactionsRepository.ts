import Transaction from '../models/Transaction';

interface CreateTransactiontDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((acc, transaction) => {
        return (acc += transaction.value);
      }, 0);
    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((acc, transaction) => {
        return (acc += transaction.value);
      }, 0);
    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: CreateTransactiontDTO): Transaction {
    const { total } = this.getBalance();
    if (type === 'outcome' && value > total) {
      throw Error('Sem saldo suficiente para a operação')
    }
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
