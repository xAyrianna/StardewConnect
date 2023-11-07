import { Test, TestingModule } from '@nestjs/testing';
import { VillagerService } from './villager.service';

describe('VillagerService', () => {
  let service: VillagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VillagerService],
    }).compile();

    service = module.get<VillagerService>(VillagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
