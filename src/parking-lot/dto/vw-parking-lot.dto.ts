import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class VWParkingLotDto {
    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    parkingLotId?: number;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    parkingName?: string;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    totalParkingSlot?: number;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    totalUsedParkingSlot?: number;

    @ApiProperty()
    @IsBoolean()
    @Type(() => Boolean)
    isParkingFull?: boolean;
}
