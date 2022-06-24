import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import supertest from 'supertest';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';

const openingTimesMock = {
  monday: {
    lunch: {
      from: '09:00:00',
      to: '11:00:00',
    },
    dinner: {
      from: '17:30:00',
      to: '22:00:00',
    },
  },
  tuesday: undefined,
};

const mockedRestaurantService = {
  getOpeningTimes: jest.fn(),
  getTables: jest.fn(),
  setRemoveTables: jest.fn(),
  setAddTables: jest.fn(),
};

describe('RestaurantController', () => {
  let app: INestApplication;
  let controller: RestaurantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantController],
      providers: [
        {
          provide: RestaurantService,
          useValue: mockedRestaurantService,
        },
      ],
    }).compile();

    controller = module.get<RestaurantController>(RestaurantController);
    app = module.createNestApplication();

    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get tables for restaurant', () => {
    mockedRestaurantService.getTables.mockReturnValue({
      updatedNumberOfTables: 5,
    });

    return supertest(app.getHttpServer())
      .get('/restaurants/someRestaurantId/tables')
      .expect(200)
      .expect({
        data: {
          updatedNumberOfTables: 5,
        },
      });
  });

  it('should add tables for restaurant', () => {
    mockedRestaurantService.setAddTables.mockReturnValue({
      updatedNumberOfTables: 7,
    });

    return supertest(app.getHttpServer())
      .put('/restaurants/someRestaurantId/add-tables')
      .expect(200)
      .expect({
        data: {
          updatedNumberOfTables: 7,
        },
      });
  });

  it('should remove tables for restaurant', () => {
    mockedRestaurantService.setRemoveTables.mockReturnValue({
      updatedNumberOfTables: 5,
    });

    return supertest(app.getHttpServer())
      .put('/restaurants/someRestaurantId/remove-tables')
      .expect(200)
      .expect({
        data: {
          updatedNumberOfTables: 5,
        },
      });
  });
});
