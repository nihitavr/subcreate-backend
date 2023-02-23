export const MongoDbConfig = {
  host: process.env.MONGO_HOST,
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSOWRD,
  database: process.env.DB_DATABASE,
  authenticationDatabase: process.env.DB_AUTH_DATABASE,
};
