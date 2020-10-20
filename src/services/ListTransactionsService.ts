import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface ResponseInterface {
  Transaction[];
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class ListTransactionsService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): ResponseInterface {
    return transactionsList;
  }
}

export default ListTransactionsService;

