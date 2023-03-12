import { PickType } from '@nestjs/swagger';
import { ParkingSlotReservationDto } from 'src/parking-slot-reservation/dto/parking-slot-reservation.dto';

export class CreateCustomerAppSlotReservationDto extends PickType(
    ParkingSlotReservationDto,
    ['carSize', 'numberPlate'],
) { }
