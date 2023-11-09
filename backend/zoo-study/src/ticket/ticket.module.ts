import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketSchema } from 'src/ticket/schema/ticket.schama';
import { Ticket } from 'src/ticket/entities/ticket.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Ticket.name,
        schema: TicketSchema,
      },
    ]),
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
