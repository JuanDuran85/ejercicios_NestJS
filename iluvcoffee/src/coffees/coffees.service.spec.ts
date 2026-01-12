import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CoffeesService } from './coffees.service';
import coffeesConfig from './config/coffees.config';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

type MockRepository<T = any> = Partial<
  Record<keyof Repository<any>, jest.Mock>
>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('CoffeesController', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        { provide: 'COFFEE_BRANDS', useValue: ['buddy brew', 'nescafe'] },
        {
          provide: 'COFFEE_BRANDS_2',
          useFactory: () => ['buddy brew 2', 'nescafe 2'],
        },
        {
          provide: ConfigService,
          useValue: { get: (key: string) => 'mock value' },
        },
        { provide: coffeesConfig.KEY, useValue: { foo: 'bar' } },
      ],
    }).compile();

    service = moduleRef.get<CoffeesService>(CoffeesService);
    coffeeRepository = moduleRef.get<MockRepository>(
      getRepositoryToken(Coffee),
    );
  });

  describe('should be defined', () => {
    it('should return an array of CoffeesService', async () => {
      expect(service).toBeDefined();
    });
  });

  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = '1';
        const expectedCoffee = {};

        coffeeRepository!.findOne!.mockReturnValue(expectedCoffee);
        const coffee: Coffee = await service.findOne(coffeeId);
        expect(coffee).toEqual(expectedCoffee);
      });
    });

    describe('otherwise', () => {
      it('should return the coffee object', async () => {
        const coffeeId = '1';
        coffeeRepository!.findOne!.mockReturnValue(undefined);

        try {
          await service.findOne(coffeeId);
          expect(false).toBeTruthy();
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toEqual(`Coffee #${coffeeId} not found`);
        }
      });
    });
  });
});
