import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TownController } from './town/town.controller';
import { TownService } from './town/town.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { EventController } from './event/event.controller';
import { EventService } from './event/event.service';
import { VillagerService } from './villager/villager.service';
import { VillagerController } from './villager/villager.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    TownController,
    UserController,
    EventController,
    VillagerController,
    AuthController,
  ],
  providers: [
    AppService,
    TownService,
    UserService,
    EventService,
    VillagerService,
    AuthService,
  ],
})
export class AppModule {}
