import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDbConfig } from 'src/config/mongo-db.config';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${MongoDbConfig.username}:${MongoDbConfig.password}@${MongoDbConfig.host}?retryWrites=true&w=majority`,
    ),
  ],
})
export class DatabaseModule {}
