// Single-table design: penance-{env} (e.g. penance-local, penance-dev).
const env = process.env.PENANCE_ENV ?? "local";

export function tableName(): string {
  return `penance-${env}`;
}
