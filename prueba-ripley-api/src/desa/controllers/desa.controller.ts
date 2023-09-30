import {
  Body,
  Post,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { DesaService } from '../services/desa.service';
import { CalculateTasaDto } from '../dto/calculate-tasa.dto';
import { CalculateTasaResponse } from '../responses/calculate-tasa.response';
import { TrxLog } from '../entities/trx-log.entity';
import { GetSimulationDto } from '../dto/get-simulation.dto';

@ApiTags('desa')
@Controller('desa')
export class DesaController {
  constructor(private readonly desaService: DesaService) {}

  @Post('gettasa')
  @ApiCreatedResponse({
    description: 'Calcula una nueva simulacion',
    type: CalculateTasaResponse,
  })
  @ApiBadRequestResponse({
    description: 'Error de validacion',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error inmanejable',
  })
  async calculateTasa(
    @Body() calculateTasaDto: CalculateTasaDto,
  ): Promise<CalculateTasaResponse> {
    let valorCuota;

    try {
      valorCuota = await this.desaService.saveTasa(calculateTasaDto);
    } catch (error) {
      throw new InternalServerErrorException('Error calculando la cuota');
    }

    return {
      status: HttpStatus.CREATED,
      ValorCuota: valorCuota,
    };
  }

  @ApiOkResponse({
    description: 'Obtener las simulaciones por rut',
    type: [TrxLog],
  })
  @ApiNotFoundResponse({
    description: 'Simulaciones no encontradas',
  })
  @ApiBadRequestResponse({
    description: 'Error de validacion',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error inmanejable',
  })
  @Get(':rut')
  async getSimulations(
    @Param() getSimulationDto: GetSimulationDto,
  ): Promise<TrxLog[]> {
    const { rut } = getSimulationDto;
    let tasas;

    try {
      tasas = await this.desaService.getSimulationByRut(rut);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        `Error al obtener las simulaciones del rut ${rut}`,
      );
    }

    return tasas;
  }
}
