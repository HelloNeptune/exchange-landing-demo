import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ArrowLeftRight, X } from "lucide-react";
import styles from './currency-converter.module.scss';
import { FromBox } from "./from-box";
import { ToBox } from "./to-box";
import { ExchangeRateService } from "../services";

export function CurrencyConverter() {
  const [amount, setAmount] = useState("0");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState<number | null>(null);
  const [isSwapping, setIsSwapping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConvert = async () => {
    const amountNum = parseFloat(amount);
    if (!isNaN(amountNum) && fromCurrency && toCurrency && amountNum > 0) {
      if (fromCurrency === toCurrency) {
        setResult(amountNum);
        return;
      }

      setIsLoading(true);

      const [error, conversionData] = await ExchangeRateService.convertCurrency(
        fromCurrency,
        toCurrency,
        amountNum
      );

      if (error || !conversionData) {
        console.warn('API failed, using fallback rates:', error);
      } else {
        setResult(conversionData.conversion_result);
      }

      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSwapping) {
      handleConvert();
      setIsSwapping(false);
    }
  }, [fromCurrency, toCurrency, isSwapping]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (parseInt(amount) && fromCurrency && toCurrency && !isSwapping) {
        handleConvert();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [amount, fromCurrency, toCurrency]);

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setIsSwapping(true);
  };
  return (
    <section
      className={styles['currency-converter']}>

      <div className="decorative-orb decorative-orb-1"></div>
      <div className="decorative-orb decorative-orb-2"></div>
      <div className="decorative-orb decorative-orb-3"></div>
      <div className="decorative-orb decorative-orb-4"></div>
      <div className="decorative-orb decorative-orb-5"></div>

      <div className="conversion-boxes">
        <div className="text-content">
          <div className="decorative-orb decorative-orb-6"></div>

          <div className="tool-icon">
            <div className="icon">
              <img src="/tool-icon.png" />
            </div>
          </div>

          <div className="tool-name-divider">
            <h2 className="tool-name">Currency Converter</h2>

            <div className="divider">
              <div className="strip strip-1"></div>
              <div className="strip strip-2"></div>
              <div className="strip strip-3 "></div>
            </div>

            <p className="tool-text">
              Real-time exchange rates • Fast & secure
              conversion
            </p>
          </div>
        </div>

        <div className="conversion-cards">
          <FromBox 
            fromCurrency={fromCurrency}
            amount={amount}
            onCurrencyChange={setFromCurrency}
            onAmountChange={setAmount}
          />

          <div className="swap-button-container">
            <Button
              variant="outline"
              size="icon"
              onClick={handleSwap}
              className="action-button swap-button"
            >
              <ArrowLeftRight className="swap-icon" />
              <div className="button-shine"></div>
            </Button>
          </div>

          <ToBox 
            toCurrency={toCurrency}
            result={result}
            onCurrencyChange={setToCurrency}
          />
        </div>

        <div className="convert-button-container">
          <Button
            onClick={handleConvert}
            className="action-button"
            disabled={isLoading}
          >
            <span className="button-text">
              {isLoading ? 'Converting...' : 'Convert Currency'}
            </span>
            <div className="button-shine"></div>
          </Button>
        </div>

        {result !== null && (
          <div className="result-container">
            <button 
              className="result-close-button"
              onClick={() => {
                setResult(null);
                setAmount("0");
              }}
            >
              <X size={16} />
            </button>
            <p className="result-text">
              <span className="amount-from">
                {amount} {fromCurrency}
              </span>
              <span className="separator">
                ≈
              </span>
              <span className="amount-to">
                {result.toFixed(2)} {toCurrency}
              </span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}