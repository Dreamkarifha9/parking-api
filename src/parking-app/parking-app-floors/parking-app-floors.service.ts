import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { SearchFloor } from 'src/floors/dto/search-block.dto';
import { FloorsService } from 'src/floors/floors.service';
import { VWFloorService } from 'src/floors/vw-floors.service';
import { CreateParkingAppFloorDto } from './dto/create-parking-app-floor.dto';

import { UpdateParkingAppFloorDto } from './dto/update-parking-app-floor.dto';

@Injectable()
export class ParkingAppFloorsService {
  private readonly logger: Logger = new Logger(ParkingAppFloorsService.name);
  constructor(
    private readonly floorsService: FloorsService,
    private readonly vWFloorService: VWFloorService,
  ) { }
  create(createParkingAppFloorDto: CreateParkingAppFloorDto) {
    return this.floorsService.create(createParkingAppFloorDto.floors);
  }

  findAll(query: SearchFloor) {
    return this.floorsService.findAll(query);
  }
  findSummary() {
    return this.vWFloorService.findSummary();
  }

  findOne(id: number) {
    return `This action returns a #${id} parkingAppFloor`;
  }

  async update(updateParkingAppFloorDto: UpdateParkingAppFloorDto) {
    return this.floorsService.update(updateParkingAppFloorDto.floors);
  }

  remove(id: number) {
    return `This action removes a #${id} parkingAppFloor`;
  }
}
