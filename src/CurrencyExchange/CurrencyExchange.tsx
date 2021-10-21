import React, { useState, useEffect } from "react";
import axios from "axios";

import CurrencyInput from "./CurrencyInput/CurrencyInput";
import classes from "./CurrencyExchange.module.css";

interface Rates {
  rates: [];
}

function CurrencyExchange() {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("EUR");
  const [rates, setRates] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get<Rates>(
          "https://openexchangerates.org/api/latest.json?app_id=27b8d0597b214578846d89196f804ef2"
        )
        .then((response) => {
          setRates(response.data.rates);
        });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!rates) {
      calcAmount1(1);
    }
  });

  function formatValue(number: any) {
    return number.toFixed(2);
  }

  function calcAmount1(amount1: number) {
    setAmount2(formatValue((amount1 * rates[currency2]) / rates[currency1]));
    setAmount1(amount1);
  }

  function calcCurrency1(currency1: string) {
    setAmount2(formatValue((amount1 * rates[currency2]) / rates[currency1]));
    setCurrency1(currency1);
  }

  function calcAmount2(amount2: number) {
    setAmount1(formatValue((amount2 * rates[currency1]) / rates[currency2]));
    setAmount2(amount2);
  }

  function calcCurrency2(currency2: string) {
    setAmount1(formatValue((amount2 * rates[currency1]) / rates[currency2]));
    setCurrency2(currency2);
  }

  return (
    <div data-testid="currency-exchange" className={classes.CurrencyExchange}>
      <h1>Currency Exchange</h1>
      <div className={classes.ChangeRates}>
        {rates[currency1] + " " + currency1} ={" "}
        {rates[currency2] + " " + currency2}
      </div>
      <CurrencyInput
        amount={amount1}
        currency={currency1}
        currencies={Object.keys(rates)}
        onAmountChange={calcAmount1}
        onCurrencyChange={calcCurrency1}
        balance={134 + currency1}
      />
      <CurrencyInput
        amount={amount2}
        currency={currency2}
        currencies={Object.keys(rates)}
        onAmountChange={calcAmount2}
        onCurrencyChange={calcCurrency2}
        balance={476 + currency2}
      />
    </div>
  );
}

export default CurrencyExchange;
