import to from 'await-to-js';
import axios from 'axios';
import { CurrencyListResponse, ExchangeRateResponse } from './shared/api-types';

const PRIMARY_API_BASE = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1';
const FALLBACK_API_BASE = 'https://latest.currency-api.pages.dev/v1';

const API_ENDPOINTS = {
  CURRENCIES: () => `/currencies.json`,
  CURRENCY_RATES: (baseCurrency: string) => `/currencies/${baseCurrency.toLowerCase()}.json`,
};

async function fetchWithFallback<T>(endpoint: string) {
  const [primaryError, primaryResponse] = await to(
    axios.get<T>(`${PRIMARY_API_BASE}${endpoint}`)
  );

  if (!primaryError && primaryResponse) {
    return [null, primaryResponse.data];
  }

  const [fallbackError, fallbackResponse] = await to(
    axios.get(`${FALLBACK_API_BASE}${endpoint}`)
  );

  if (fallbackError || !fallbackResponse) {
    console.error('Both APIs failed:', { primaryError, fallbackError });
    return [fallbackError || new Error('Both APIs failed'), null];
  }

  return [null, fallbackResponse.data];
}

// Service Functions
export class ExchangeRateService {
  /**
   * Get latest exchange rates for a base currency
   */
  static async getLatestRates(baseCurrency: string = 'USD') {
    const [error, data] = await fetchWithFallback<ExchangeRateResponse>(
      API_ENDPOINTS.CURRENCY_RATES(baseCurrency)
    );

    if (error) {
      console.error('Failed to fetch exchange rates:', error);
      return [error, null];
    }

    const transformedData = {
      base: baseCurrency.toUpperCase(),
      date: new Date().toISOString().split('T')[0],
      rates: data[baseCurrency.toLowerCase()] || {}
    };

    return [null, transformedData];
  }

  /**
   * Convert amount from one currency to another
   */
  static async convertCurrency(
    fromCurrency: string,
    toCurrency: string,
    amount: number
  ) {
    const [error, ratesData] = await this.getLatestRates(fromCurrency);

    if (error || !ratesData) {
      return [error, null];
    }

    const rate = ratesData.rates[toCurrency.toLowerCase()];
    if (!rate) {
      const rateError = new Error(`Exchange rate not found for ${fromCurrency} to ${toCurrency}`);
      return [rateError, null];
    }

    const conversionResult = {
      base_code: fromCurrency.toUpperCase(),
      target_code: toCurrency.toUpperCase(),
      conversion_rate: rate,
      conversion_result: amount * rate
    };

    return [null, conversionResult];
  }

  /**
   * Get list of supported currencies
   */
  static async getSupportedCurrencies() {
    const [error, data] = await fetchWithFallback<CurrencyListResponse>(API_ENDPOINTS.CURRENCIES());

    if (error) {
      console.error('Failed to fetch supported currencies:', error);
      return [error, null];
    }

    const supportedCodes = Object.entries(data).map(([code, name]) => [
      code.toUpperCase(),
      name as string
    ]);

    const transformedData = {
      supported_codes: supportedCodes
    };

    return [null, transformedData];
  }

  /**
   * Get exchange rate between two currencies
   */
  static async getExchangeRate(fromCurrency: string, toCurrency: string) {
    const [error, data] = await this.getLatestRates(fromCurrency);

    if (error || !data) {
      return [error, null];
    }

    const rate = data.rates[toCurrency];

    if (!rate) {
      const rateError = new Error(`Exchange rate not found for ${fromCurrency} to ${toCurrency}`);
      return [rateError, null];
    }

    return [null, rate];
  }
}
