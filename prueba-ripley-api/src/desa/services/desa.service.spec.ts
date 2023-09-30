import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { DesaService } from './desa.service';
import { TrxLog } from '../entities/trx-log.entity';
import { Like, Repository } from 'typeorm';

describe('DesaService', () => {
  let save;
  let find;
  let service: DesaService;
  let trxRepository: Repository<TrxLog>;

  beforeEach(async () => {
    save = jest.fn().mockResolvedValue(true);
    find = jest.fn().mockResolvedValue([
      {
        id_TRX: 1,
        fecha_TRX: '2023-09-29T23:01:57.505Z',
        json_TRX: '{"RutCliente":"11","MontoDelCredito":100,"NumeroCuotas":2}',
      },
    ]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DesaService,
        { provide: getRepositoryToken(TrxLog), useValue: { save, find } },
      ],
    }).compile();

    service = module.get<DesaService>(DesaService);
    trxRepository = module.get(getRepositoryToken(TrxLog));
  });

  describe('calculateTasa', () => {
    it('Should calculate a tasa', () => {
      const response = service.calculateTasa(100, 2);

      expect(response).toBe(52);
    });
  });

  describe('saveTasa', () => {
    it('Should persist data to the db', async () => {
      service.calculateTasa = jest.fn().mockReturnValue(52);

      const response = await service.saveTasa({
        RutCliente: '11',
        MontoDelCredito: 100,
        NumeroCuotas: 2,
      });

      expect(response).toBe(52);
      expect(save).toHaveBeenCalledWith({ json_TRX: expect.anything() });
    });
  });

  describe('getSimulationByRut', () => {
    it('Should return an array of simulations by rut', async () => {
      const response = await service.getSimulationByRut('11');

      expect(response).toEqual([
        {
          id_TRX: 1,
          fecha_TRX: '2023-09-29T23:01:57.505Z',
          json_TRX:
            '{"RutCliente":"11","MontoDelCredito":100,"NumeroCuotas":2}',
        },
      ]);

      expect(find).toHaveBeenCalledWith({
        where: {
          json_TRX: Like('%RutCliente":"11"%'),
        },
        order: {
          fecha_TRX: 'DESC',
        },
      });
    });

    it('Should throw an exception', () => {
      trxRepository.find = jest.fn().mockResolvedValue([]);

      expect(
        async () => await service.getSimulationByRut('11'),
      ).rejects.toThrow();
    });
  });
});
