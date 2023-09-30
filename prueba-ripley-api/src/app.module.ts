import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DesaModule } from './desa/desa.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('dbHost'),
        username: configService.get<string>('dbUsername'),
        password: configService.get<string>('dbPassword'),
        database: configService.get<string>('dbName'),
        autoLoadEntities: true,
      }),
    }),
    DesaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
