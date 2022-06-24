import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { TablesDto } from './models/restaurant.dto';
import { Restaurant } from './models/restaurant.schema';
import { RestaurantService } from './restaurant.service';

const resultMock = jest.fn();
const RestaurantModelMock = {
  find: jest.fn(),
  findOne: jest.fn(() => {
    return {
      exec: resultMock,
    };
  }),
  findByIdAndUpdate: jest.fn(),
};

describe('RestaurantController', () => {
  let service: RestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantService,
        {
          provide: getModelToken(Restaurant.name),
          useValue: RestaurantModelMock,
        },
      ],
    }).compile();

    service = module.get<RestaurantService>(RestaurantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTables', () => {
    it('should get tables', async () => {
      resultMock.mockReturnValue({
        tables: 5,
      });

      const findOneSpy = jest.spyOn(RestaurantModelMock, 'findOne');

      const returnedeNumberOfTables = await service.getTables(
        'someRestaurantId'
      );

      expect(findOneSpy).toHaveBeenCalledWith(
        { _id: 'someRestaurantId' },
        { _id: 0, tables: 1 }
      );

      expect(returnedeNumberOfTables).toBeInstanceOf(TablesDto);
      expect(returnedeNumberOfTables.updatedNumberOfTables).toBe(5);
    });
  });
});
