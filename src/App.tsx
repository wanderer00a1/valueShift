import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDot } from "react-loading-indicators";
function App() {
  return (
    <div
      className="w-screen min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/home.png')" }}
    >
      <NavBar />
      <Form />
    </div>
  );
}

function Form() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [converted, setConverted] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function converter() {
      setIsLoading(true);
      const res = await axios.get(
        `https://api.frankfurter.dev/v1/latest?amount=${amount}&base=${from}&symbols=${to}`
      );
      setConverted(res.data.rates[to]);
      setIsLoading(false);
    }
    if (amount === 0 || to === from ) {
      setConverted(amount);
      return;
    }
    converter();
  }, [from, to, amount]);
  return (
    <form className="convert-form">
      <div className="from">
        <label>{from}</label>
        <br />
        <input
          type="text"
          value={amount}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setAmount(Number(value));
            }
          }}
          disabled={isLoading}
        />
      </div>
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        disabled={isLoading}
      >
        <option value="EUR">EUR</option>
        <option value="AUD">AUD</option>
        <option value="INR">INR</option>
        <option value="USD">USD</option>
        <option value="JPY">JPY</option>
        <option value="CNY">CNY</option>
      </select>
      <p style={{ display: "grid", placeItems: "center", fontSize: "30px" }}>
        ⬇️
      </p>
      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="AUD">AUD</option>
        <option value="INR">INR</option>
        <option value="EUR">EUR</option>
        <option value="JPY">JPY</option>
        <option value="CNY">CNY</option>
      </select>
      <div className="to">
        {isLoading ? (
          <ThreeDot color="#31b2cc" />
        ) : (
          <input type="numeric" value={converted} disabled />
        )}
        <br />
        <label style={{ display: "grid", placeItems: "center" }}>{to}</label>
      </div>
    </form>
  );
}

export default App;
