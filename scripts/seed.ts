import "dotenv/config";
import { CreateTableCommand, DescribeTableCommand } from "@aws-sdk/client-dynamodb";
import { BatchWriteCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuid } from "uuid";
import { dynamo, docClient } from "../src/dynamodb/client.js";
import { tableName } from "../src/dynamodb/tableNames.js";
import { cardTemplates } from "../src/modules/cards/catalog.js";

const table = tableName("");

async function ensureTable(): Promise<void> {
  try {
    await dynamo.send(new DescribeTableCommand({ TableName: table }));
    console.log(`Table ${table} already exists.`);
  } catch (err: unknown) {
    if (err && typeof err === "object" && "name" in err && err.name === "ResourceNotFoundException") {
      await dynamo.send(
        new CreateTableCommand({
          TableName: table,
          AttributeDefinitions: [
            { AttributeName: "pk", AttributeType: "S" },
            { AttributeName: "sk", AttributeType: "S" },
          ],
          KeySchema: [
            { AttributeName: "pk", KeyType: "HASH" },
            { AttributeName: "sk", KeyType: "RANGE" },
          ],
          BillingMode: "PAY_PER_REQUEST",
        }),
      );
      console.log(`Created table ${table}.`);
    } else {
      throw err;
    }
  }
}

async function clearCards(): Promise<void> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: table,
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: { ":pk": "CARD" },
      ProjectionExpression: "pk, sk",
    }),
  );
  const items = result.Items ?? [];
  if (items.length === 0) {
    console.log("No existing cards to clear.");
    return;
  }
  const BATCH_SIZE = 25;
  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const chunk = items.slice(i, i + BATCH_SIZE);
    await docClient.send(
      new BatchWriteCommand({
        RequestItems: {
          [table]: chunk.map((item) => ({
            DeleteRequest: { Key: { pk: item.pk, sk: item.sk } },
          })),
        },
      }),
    );
  }
  console.log(`Cleared ${items.length} existing card(s).`);
}

async function seedCards(): Promise<void> {
  for (const card of cardTemplates) {
    const id = uuid();
    await docClient.send(
      new PutCommand({
        TableName: table,
        Item: {
          pk: "CARD",
          sk: id,
          ...card,
        },
      }),
    );
  }
  console.log(`Seeded ${cardTemplates.length} cards.`);
}

async function main(): Promise<void> {
  await ensureTable();
  await clearCards();
  await seedCards();
  console.log("Seed done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
