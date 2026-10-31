import { ValueTransformer } from "typeorm";

/**
 * PostgreSQL returns NUMERIC/DECIMAL columns as strings (to avoid precision loss).
 * This transformer converts them back to JavaScript numbers when reading,
 * so the API returns `"price": 55.5` instead of `"price": "55.50"`.
 */
export const decimalTransformer: ValueTransformer = {
  to: (value?: number | null) => value,
  from: (value?: string | null) =>
    value === null || value === undefined ? value : parseFloat(value),
};
