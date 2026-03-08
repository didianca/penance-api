import { GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../dynamodb/client.js";
import { tableName } from "../../dynamodb/tableNames.js";
import type { CardRecord } from "./catalog.js";

const table = tableName();

function itemToCard(item: Record<string, unknown>): CardRecord {
  const { pk, sk, ...rest } = item;
  return { ...rest, id: sk as string } as CardRecord;
}

export async function listCards(): Promise<CardRecord[]> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: table,
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: { ":pk": "CARD" },
    }),
  );
  return (result.Items ?? []).map((item) => itemToCard(item));
}

export async function getCardById(id: string): Promise<CardRecord | null> {
  const result = await docClient.send(
    new GetCommand({
      TableName: table,
      Key: { pk: "CARD", sk: id },
    }),
  );
  if (!result.Item) return null;
  return itemToCard(result.Item);
}
