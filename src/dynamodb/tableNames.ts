// Table names follow: penance-{env} (e.g. penance-local, penance-dev, penance-prod).
// This keeps local/dev/prod data separate when using the same AWS account or DynamoDB Local.
const env = process.env.PENANCE_ENV ?? "local";

export function tableName(table: string): string {
  return `penance-${env}`;
}
