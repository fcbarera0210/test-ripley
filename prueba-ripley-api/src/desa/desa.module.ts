import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrxLog } from './entities/trx-log.entity';
import { DesaService } from './services/desa.service';
import { DesaController } from './controllers/desa.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TrxLog])],
  providers: [DesaService],
  controllers: [DesaController],
})
export class DesaModule {}
