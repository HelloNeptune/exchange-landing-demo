// ExchangeRate API Types

/**
 * Response from latest rates endpoint
 */
export interface ExchangeRateResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
}

/**
 * Response from supported currencies endpoint
 */
export interface CurrencyListResponse {
  supported_codes: Array<[string, string]>;
}
