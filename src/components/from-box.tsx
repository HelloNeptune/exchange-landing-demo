import { Select } from "./ui/select";
import { currencies } from "../shared/constants";

interface FromBoxProps {
  fromCurrency: string;
  amount: string;
  onCurrencyChange: (currency: string) => void;
  onAmountChange: (amount: string) => void;
}

export function FromBox({ fromCurrency, amount, onCurrencyChange, onAmountChange }: FromBoxProps) {
  const currencyOptions = currencies.map((currency) => ({
    value: currency.code,
    label: `${currency.code} - ${currency.name}`,
    icon: currency.iconImage,
    flag: currency.flag,
  }));

  return (
    <div className='conversion-card'>
      <label data-slot="label" htmlFor="from" className="input-label">From</label>

      <Select
        id="from"
        className="select-trigger"
        value={fromCurrency}
        onValueChange={onCurrencyChange}
        items={currencyOptions}
      />
      <input
        id="amount"
        type="number"
        value={amount}
        placeholder="0.00"
        className="input"
        onChange={(e) => onAmountChange(e.target.value)}
      />
    </div>
  );
}
