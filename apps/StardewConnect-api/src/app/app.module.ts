import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { TownController } from './town/town.controller';
import { UserController } from './user/user.controller';
import { EventController } from './event/event.controller';
import { VillagerController } from './villager/villager.controller';
import { AuthController } from './auth/auth.controller';
import { EventModule } from './event/event.module';
import { TownModule } from './town/town.module';
import { UserModule } from './user/user.module';
import { VillagerModule } from './villager/villager.module';
import { AuthModule } from './auth/auth.module';
import { Neo4jScheme } from './neo4j/neo4j.config.interface';
import { Neo4jModule } from './neo4j/neo4j.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONN),
    Neo4jModule.forRootAsync({
      scheme: process.env.NEO4J_SCHEME as Neo4jScheme,
      host: process.env.NEO4J_HOST,
      username: process.env.NEO4J_USR,
      password: process.env.NEO4J_PWD,
      database: process.env.NEO4J_DATABASE,
  }),
    EventModule,
    TownModule,
    UserModule,
    VillagerModule,
    AuthModule,
  ],
  controllers: [
    AppController,
    TownController,
    UserController,
    EventController,
    VillagerController,
    AuthController,
  ],
  providers: [],
})
export class AppModule {}
