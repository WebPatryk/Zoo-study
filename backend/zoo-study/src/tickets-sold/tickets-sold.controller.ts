import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TicketsSoldService } from 'src/tickets-sold/tickets-sold.service';
import { UpdateTicketsSoldDto } from 'src/tickets-sold/dto/update-tickets-sold.dto';
import { CreateTicketsSoldDto } from 'src/tickets-sold/dto/create-tickets-sold.dto';

@Controller('tickets-sold')
export class TicketsSoldController {
  constructor(private readonly ticketsSoldService: TicketsSoldService) {}

  @Post()
  create(@Body() createTicketsSoldDto: CreateTicketsSoldDto) {
    return this.ticketsSoldService.create(createTicketsSoldDto);
  }

  @Get()
  findAll() {
    return this.ticketsSoldService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsSoldService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketsSoldDto: UpdateTicketsSoldDto,
  ) {
    return this.ticketsSoldService.update(id, updateTicketsSoldDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsSoldService.remove(id);
  }
}
