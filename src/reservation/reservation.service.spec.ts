import { InternalServerErrorException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantService } from '../restaurant/restaurant.service';
import { Reservation } from './models/reservation.schema';
import { ReservationService } from './reservation.service';

const resultMock = jest.fn();
const ReservationModelMock = {
  find: jest.fn(() => {
    return {
      count: resultMock,
    };
  }),
  create: jest.fn(),
};

const mockRestaurantService = {
  _isOpenAtTime: jest.fn(),
  getTables: jest.fn(),
};

describe('ReservationController', () => {
  let service: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: getModelToken(Reservation.name),
          useValue: ReservationModelMock,
        },
        {
          provide: RestaurantService,
          useValue: mockRestaurantService,
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const reservation = {
    name: 'Guest',
    tables: 1,
    time: 'Mon Jun 27 2022 11:25:11 GMT+0200 (Central European Summer Time)',
  };

  describe('place reservation', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return OK if the reservation is successfull', async () => {
      mockRestaurantService._isOpenAtTime.mockResolvedValue(true);
      mockRestaurantService.getTables.mockResolvedValue(5);
      resultMock.mockReturnValue(2);

      const createSpy = jest.spyOn(ReservationModelMock, 'create');

      const response = await service.addReservation(
        'someRestaurantId',
        reservation
      );
      expect(createSpy).toBeCalledWith({
        name: 'Guest',
        tables: 1,
        restaurant: 'someRestaurantId',
        from: new Date('2022-06-27T09:25:11.000Z'),
        to: new Date('2022-06-27T10:25:11.000Z'),
      });
      expect(response).toBe('OK');
    });

    it('should return "Restaurant is closed" if reservation is about to be placed in restaurant colsed time', async () => {
      mockRestaurantService._isOpenAtTime.mockResolvedValue(false);
      mockRestaurantService.getTables.mockResolvedValue(5);
      resultMock.mockReturnValue(2);

      const createSpy = jest.spyOn(ReservationModelMock, 'create');

      const response = await service.addReservation(
        'someRestaurantId',
        reservation
      );
      expect(createSpy).not.toBeCalled();
      expect(response).toBe('Restaurant is closed');
    });

    it('should return "Restaurant is full" if the number of booked tables equals the restaurant capacity', async () => {
      mockRestaurantService._isOpenAtTime.mockResolvedValue(true);
      mockRestaurantService.getTables.mockResolvedValue({
        updatedNumberOfTables: 5,
      });
      resultMock.mockReturnValue(5);

      const createSpy = jest.spyOn(ReservationModelMock, 'create');

      const response = await service.addReservation(
        'someRestaurantId',
        reservation
      );
      expect(createSpy).not.toBeCalled();
      expect(response).toBe('Restaurant is full');
    });
  });
});
