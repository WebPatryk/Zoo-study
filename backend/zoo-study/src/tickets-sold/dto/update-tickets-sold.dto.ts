import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketsSoldDto } from 'src/tickets-sold/dto/create-tickets-sold.dto';

export class UpdateTicketsSoldDto extends PartialType(CreateTicketsSoldDto) {}
