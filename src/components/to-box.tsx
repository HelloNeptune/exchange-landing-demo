import { Select } from "./ui/select";
import { currencies } from "../shared/constants";
import clsx from "clsx";

interface ToBoxProps {
  toCurrency: string;
  result: number | null;
  onCurrencyChange: (currency: string) => void;
}

export function ToBox({ toCurrency, result, onCurrencyChange }: ToBoxProps) {
  const currencyOptions = currencies.map((currency) => ({
    value: currency.code,
    label: `${currency.code} - ${currency.name}`,
    icon: currency.iconImage,
    flag: currency.flag,
  }));

  return (
    <div className={clsx('conversion-card', 'to')}>
      <label data-slot="label" htmlFor="to" className="input-label">To</label>
      <Select
        id="to"
        className="select-trigger"
        value={toCurrency}
        onValueChange={onCurrencyChange}
        items={currencyOptions}
      />
      <div className="result-display">
        <span className="result-amount">
          {result !== null
            ? result.toFixed(2)
            : "0.00"}
        </span>
      </div>
    </div>
  );
}
