import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// PENANCE_ENV controls which backend we use: "local" = DynamoDB Local, anything else = real AWS.
const env = process.env.PENANCE_ENV ?? "local";

// For DynamoDB Local we must point the client at our local endpoint (e.g. port 8000).
const isLocal = env === "local";

const dynamoClient = new DynamoDBClient({
  ...(isLocal
    ? {
        endpoint: "http://localhost:8000",
        region: "us-east-1",
        credentials: {
          accessKeyId: "local",
          secretAccessKey: "local",
        },
      }
    : {}),
});

// DocumentClient (DynamoDBDocumentClient) lets you work with plain JavaScript objects instead of
// DynamoDB's native AttributeValue format (e.g. { S: "hello" }). It marshals/unmarshals automatically.
export const docClient = DynamoDBDocumentClient.from(dynamoClient);
export const dynamo = dynamoClient;
