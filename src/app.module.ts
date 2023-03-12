import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './configs/database.config';
import { ParkingLotModule } from './parking-lot/parking-lot.module';
import { ParkingAppParkingLotsModule } from './parking-app/parking-app-parking-lots/parking-app-parking-lots.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    ParkingLotModule,
    ParkingAppParkingLotsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
