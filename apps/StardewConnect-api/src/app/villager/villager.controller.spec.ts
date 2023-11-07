import { Test, TestingModule } from '@nestjs/testing';
import { VillagerController } from './villager.controller';

describe('VillagerController', () => {
  let controller: VillagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VillagerController],
    }).compile();

    controller = module.get<VillagerController>(VillagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
