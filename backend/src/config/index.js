export { default as swaggerConfig } from './swagger.config.js'
import { config } from 'dotenv';
config();

//NOTE: If you are running the project in an instance, you should store these secret keys in its configuration settings.
// This type of storing secret information is only experimental and for the purpose of local running.

const { PORT, MONGODB_CONNECTION_STRING, } = process.env

export const port = PORT || 3000;
export const dbUri = MONGODB_CONNECTION_STRING
export const jwtSecretKey='secretKey'
export const refreshTokenSecretKey='secretKey'
export const awsAccessKey='secretKey'
export const awsRegion='secretKey'
export const awsSecretAccessKey='secretKey'
export const bucketName='secretKey'
export const prefix = '/api';
export const specs = "/docs";