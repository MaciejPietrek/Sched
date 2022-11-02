import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '../environments/environment.prod';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ViewSourceSchema } from './schemes/view-source.schema';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { ViewSourceController } from './view-souce/view-source.controller';

const main = environment.mongoDB.main;
const datasources = environment.mongoDB.datasources;
const mongoDbConnectionString = `mongodb+srv://${main.username}:${main.password}@modeler.uk12e.mongodb.net/${main.dbName}?retryWrites=true&w=majority`;
const dsMongoDbConnectionString = `mongodb+srv://${datasources.username}:${datasources.password}@modeler.uk12e.mongodb.net/${datasources.dbName}?retryWrites=true&w=majority`;

const models = [{ name: 'ViewSource', schema: ViewSourceSchema }];

@Module({
  imports: [
    MongooseModule.forFeature(models),
    MongooseModule.forRoot(mongoDbConnectionString),
    AuthModule,
  ],
  providers: [],
  controllers: [AppController, ViewSourceController],
})
export class AppModule {}
