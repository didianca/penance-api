import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// PENANCE_ENV controls which backend we use: "local" = DynamoDB Local, anything else = real AWS.
const env = process.env.PENANCE_ENV ?? "local";

// For DynamoDB Local we must point the client at our local endpoint (e.g. port 8000).
export const isLocalDynamo = env === "local";
const LOCAL_ENDPOINT = "http://localhost:8000";

const dynamoClient = new DynamoDBClient({
  ...(isLocalDynamo
    ? {
        endpoint: LOCAL_ENDPOINT,
        region: "us-east-1",
        credentials: {
          accessKeyId: "local",
          secretAccessKey: "local",
        },
      }
    : {}),
});

/** Resolved DynamoDB endpoint in use (for health/debug). */
export const dynamoEndpointDisplay = isLocalDynamo ? LOCAL_ENDPOINT : "dynamodb.us-east-1.amazonaws.com";

// DocumentClient (DynamoDBDocumentClient) lets you work with plain JavaScript objects instead of
// DynamoDB's native AttributeValue format (e.g. { S: "hello" }). It marshals/unmarshals automatically.
export const docClient = DynamoDBDocumentClient.from(dynamoClient);
export const dynamo = dynamoClient;
