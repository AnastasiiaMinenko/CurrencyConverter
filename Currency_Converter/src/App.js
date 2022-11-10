import "./App.css";
import CurrencyInput from "./CurrencyInput";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState("UAH");
  const [currency2, setCurrency2] = useState("USD");
  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.apilayer.com/fixer/latest?base=UAH&apikey=SrdECQOeKdEuZoxwhIb1GrkBNA3kE4n2"
      )
      .then((response) => {
        setRates(response.data.rates);
      });
  }, []);

  useEffect(() => {
    if (!!rates) {
      function init() {
        handleAmount1Change(1);
      }
      init();
    }
  }, [rates]);

  function format(number) {
    return number.toFixed(3);
  }
  function handleAmount1Change(amount1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setCurrency2(currency2);
  }

  function fromUAH() {
    return (
      <div>
        <a className="leftSide">
          1 {"UAH"} = {format(rates["UAH"] / rates["USD"])} {"USD"}
        </a>
        <br />
        <a className="rightSide">
          1 {"UAH"} = {format(rates["UAH"] / rates["EUR"])} {"EUR"}
        </a>
      </div>
    );
  }
  return (
    <div className="wrapper">
      <header>
        <h1>
          <img width={50} height={50} src="coin.png" />
          Currency Converter
          <img width={50} height={50} src="coin.png" />
        </h1>
        <a>{fromUAH()}</a>
      </header>

      <CurrencyInput
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        currencies={Object.keys(rates)}
        amount={amount1}
        currency={currency1}
      />
      <CurrencyInput
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change}
        currencies={Object.keys(rates)}
        amount={amount2}
        currency={currency2}
      />
    </div>
  );
}

export default App;
