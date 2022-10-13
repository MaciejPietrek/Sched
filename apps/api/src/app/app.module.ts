import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '../environments/environment.prod';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

const main = environment.mongoDB.main;
const datasources = environment.mongoDB.datasources;
const mongoDbConnectionString = `mongodb+srv://${main.username}:${main.password}@modeler.uk12e.mongodb.net/${main.dbName}?retryWrites=true&w=majority`;
const dsMongoDbConnectionString = `mongodb+srv://${datasources.username}:${datasources.password}@modeler.uk12e.mongodb.net/${datasources.dbName}?retryWrites=true&w=majority`;

@Module({
  imports: [MongooseModule.forRoot(mongoDbConnectionString), AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
