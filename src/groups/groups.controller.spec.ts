import { Test, TestingModule } from '@nestjs/testing';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';

describe('GroupsController', () => {
  let controller: GroupsController;
  let service: GroupsService;
  let repository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsController],
      providers: [
        GroupsService,
        { provide: 'GroupsRepository', useValue: { getActiveGroups: jest.fn() } },
      ],
    }).compile();

    controller = module.get<GroupsController>(GroupsController);
    service = module.get<GroupsService>(GroupsService);
    repository = module.get<any>('GroupsRepository');
  });

  describe('getActiveGroups', () => {
    it('should return an array of active groups', async () => {
      const result = [
        {
          id: '1',
          name: 'Group 1',
          startDate: new Date(),
          createdAt: new Date(),
          students: [],
        },
      ];
      jest
        .spyOn(service, 'getActiveGroups')
        .mockImplementation(async () => result);

      expect(await controller.getActiveGroups()).toBe(result);
    });
  });
});
