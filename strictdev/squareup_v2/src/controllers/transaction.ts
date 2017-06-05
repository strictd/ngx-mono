
import { plainToClass } from 'class-transformer';
import { postSquareup, getSquareup } from './http-requests';

import { ISquareupListTransactions, ISquareupListTransactionsResponse } from '../models/endpoints/transaction/i-squareup-list-transactions';
import { ISquareupCharge, ISquareupChargeResponse } from '../models/endpoints/transaction/i-squareup-charge';
import { ISquareupCaptureTransaction, ISquareupCaptureTransactionResponse } from '../models/endpoints/transaction/i-squareup-capture-transaction';
import { ISquareupVoidTransaction, ISquareupVoidTransactionResponse } from '../models/endpoints/transaction/i-squareup-void-transaction';
import { ISquareupRetrieveTransaction, ISquareupRetrieveTransactionResponse } from '../models/endpoints/transaction/i-squareup-retrieve-transaction';

export function charge(location: string, req: ISquareupCharge): Promise<ISquareupChargeResponse> {
  return postSquareup(['locations', location, 'transactions'], req).then((response: ISquareupChargeResponse) => {
    const resp = plainToClass(ISquareupChargeResponse, response);
    return Promise.resolve(resp);
  });
}

export function listTransactions(req: ISquareupListTransactions): Promise<ISquareupListTransactionsResponse> {
  return Promise.resolve(plainToClass(ISquareupListTransactionsResponse, {} as Object));
}

export function captureTransaction(req: ISquareupCaptureTransaction): Promise<ISquareupCaptureTransactionResponse> {
  return Promise.resolve(plainToClass(ISquareupCaptureTransactionResponse, {} as Object));
}

export function voidTransaction(req: ISquareupVoidTransaction): Promise<ISquareupVoidTransactionResponse> {
  return Promise.resolve(plainToClass(ISquareupVoidTransactionResponse, {} as Object));
}

export function retrieveTransaction(req: ISquareupRetrieveTransaction): Promise<ISquareupRetrieveTransactionResponse> {
  return Promise.resolve(plainToClass(ISquareupRetrieveTransactionResponse, {} as Object));
}
