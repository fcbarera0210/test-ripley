import { Test, TestingModule } from '@nestjs/testing';
import { DesaController } from './desa.controller';
import { DesaService } from '../services/desa.service';
import { CalculateTasaDto } from '../dto/calculate-tasa.dto';
import { NotFoundException } from '@nestjs/common';

describe('DesaController', () => {
  let saveTasa;
  let getSimulationByRut;
  let desaService: DesaService;
  let controller: DesaController;

  beforeEach(async () => {
    saveTasa = jest.fn().mockResolvedValue(100);
    getSimulationByRut = jest.fn().mockResolvedValue({
      id_TRX: 1,
      fecha_TRX: '2023-09-29T23:01:57.505Z',
      json_TRX: '{"RutCliente":"11","MontoDelCredito":100,"NumeroCuotas":2}',
    });

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesaController],
      providers: [
        { provide: DesaService, useValue: { saveTasa, getSimulationByRut } },
      ],
    }).compile();

    controller = module.get<DesaController>(DesaController);
    desaService = module.get<DesaService>(DesaService);
  });

  describe('calculateTasa', () => {
    it('Should calculate tasa', async () => {
      const response = await controller.calculateTasa({
        RutCliente: '123',
        MontoDelCredito: 10,
        NumeroCuotas: 20,
      });

      expect(response).toEqual({
        status: 201,
        ValorCuota: 100,
      });

      expect(saveTasa).toHaveBeenCalledWith({
        RutCliente: '123',
        MontoDelCredito: 10,
        NumeroCuotas: 20,
      });
    });

    it('Should throw an exception', () => {
      desaService.saveTasa = jest
        .fn()
        .mockRejectedValue(new Error('sample error'));
      expect(
        async () => await controller.calculateTasa({} as CalculateTasaDto),
      ).rejects.toThrow();
    });
  });

  describe('getSimulations', () => {
    it('Should return simulations by rut', async () => {
      const response = await controller.getSimulations({ rut: '11' });

      expect(response).toEqual({
        id_TRX: 1,
        fecha_TRX: '2023-09-29T23:01:57.505Z',
        json_TRX: '{"RutCliente":"11","MontoDelCredito":100,"NumeroCuotas":2}',
      });

      expect(getSimulationByRut).toHaveBeenCalledWith('11');
    });

    it('Should throw an exception', () => {
      desaService.getSimulationByRut = jest
        .fn()
        .mockRejectedValue(new Error('sample error'));
      expect(
        async () => await controller.getSimulations({ rut: '11' }),
      ).rejects.toThrow();
    });

    it('Should throw an exception', () => {
      desaService.getSimulationByRut = jest
        .fn()
        .mockRejectedValue(new NotFoundException('sample error'));
      expect(
        async () => await controller.getSimulations({ rut: '11' }),
      ).rejects.toThrow();
    });
  });
});
