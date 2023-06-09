import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Min, ValidateNested } from 'class-validator';
import { SlotDto } from './slot.dto';

export class CreateSlotDto extends OmitType(SlotDto, [
    'id',
    'slotNumber',
    'isAvailable',
    'active',
    'deleted',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy',
]) {
    @ApiProperty()
    @Min(1)
    @IsNumber()
    @Type(() => Number)
    numberOfSlot: number;
}

export class CreateSlotsDto {
    @ApiProperty({ type: CreateSlotDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => CreateSlotDto)
    slots: CreateSlotDto[];
}
