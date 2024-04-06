import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Villager, VillagerSchema } from './schemas/villager.schema';
import { VillagerController } from './villager.controller';
import { VillagerService } from './villager.service';
import { User, UserSchema } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Villager.name, schema: VillagerSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [VillagerController],
  providers: [VillagerService, UserService],
  exports: [VillagerService],
})
export class VillagerModule {}
