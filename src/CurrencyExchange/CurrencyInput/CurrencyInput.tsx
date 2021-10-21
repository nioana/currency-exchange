import React from 'react';
import classes from './CurrencyInput.module.css';

interface Props {
    amount: number,
    currency: string,
    currencies: Array<string>,
    balance: string | number,
    onAmountChange: Function,
    onCurrencyChange: Function
}

function CurrencyInput (props: Props) {

  return (
    <div data-testid="currency-input" className={classes.CurrencyInputContainer}>
      <div className={classes.CurrencyInput}>
          <input type="number" pattern="^-?[0-9]\d*\.?\d*$" value={props.amount} onChange={e => props.onAmountChange(e.target.value)} />
          <select value={props.currency} onChange={e => props.onCurrencyChange(e.target.value)} >
              {props.currencies.map((currency => (
                  <option key={currency} value={currency}>{currency}</option>
              )))}
          </select>
      </div>
      <div className={classes.AccountBalance}>Account balance: {props.balance}</div>
    </div>
  );
}

export default CurrencyInput ;