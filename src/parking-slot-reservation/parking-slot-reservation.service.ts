import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VWParkingSlotsService } from 'src/slots/vw-parking-slots.service';
import { Repository } from 'typeorm';
import { CreateParkingSlotReservationDto } from './dto/create-parking-slot-reservation.dto';
import { UpdateParkingSlotReservationDto } from './dto/update-parking-slot-reservation.dto';
import { ParkingSlotReservation } from './entities/parking-slot-reservation.entity';
import { v4 as uuid } from 'uuid';
import { SlotsService } from 'src/slots/slots.service';
import { ParkingSlotReservationDto } from './dto/parking-slot-reservation.dto';
@Injectable()
export class ParkingSlotReservationService {
  private readonly logger: Logger = new Logger(
    ParkingSlotReservationService.name,
  );
  constructor(
    @InjectRepository(ParkingSlotReservation)
    private readonly parkingSlotReservationRepository: Repository<ParkingSlotReservation>,
    private readonly vWParkingSlotsService: VWParkingSlotsService,
    private readonly slotsService: SlotsService,
  ) { }
  async checkIn(
    createParkingSlotReservationDto: CreateParkingSlotReservationDto,
  ) {
    const plateNumber = await this.vWParkingSlotsService.findOneBySearch({
      numberPlate: createParkingSlotReservationDto.numberPlate,
      active: true,
      deleted: false,
      slotIsAvailable: true,
    });
    if (plateNumber) {
      throw new HttpException(
        `number Plate Has Already isUsed.`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const findNearbyExit = await this.vWParkingSlotsService.findNearbyExit(
      createParkingSlotReservationDto.carSize,
    );
    if (findNearbyExit) {
      const { slotId } = findNearbyExit;
      const mapingDto = {
        id: uuid(),
        slotId,
        starttimestamp: new Date(),
        bookingDate: new Date(),
        ...createParkingSlotReservationDto,
      };
      const newParkingSlotReservation =
        this.parkingSlotReservationRepository.create(mapingDto);
      this.logger.debug(
        `newParkingSlotReservation ${JSON.stringify(
          newParkingSlotReservation,
        )}`,
      );
      await this.parkingSlotReservationRepository.save(
        newParkingSlotReservation,
      );
      // update status isAvailable in slot table
      const findSlot = await this.slotsService.findOne(slotId);
      await this.slotsService.update(findSlot, { isAvailable: true });
      this.logger.debug(`findNearbyExit ${JSON.stringify(findNearbyExit)}`);
      return { suscuess: true };
    } else {
      throw new HttpException(`slot has been used up`, HttpStatus.NOT_FOUND);
    }
  }

  async findOneBySearch(q: Partial<ParkingSlotReservationDto>) {
    return this.parkingSlotReservationRepository.findOneBy({ ...q });
  }

  findAll() {
    return `This action returns all parkingSlotReservation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parkingSlotReservation`;
  }

  update(
    id: number,
    updateParkingSlotReservationDto: UpdateParkingSlotReservationDto,
  ) {
    return `This action updates a #${id} parkingSlotReservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} parkingSlotReservation`;
  }
}
