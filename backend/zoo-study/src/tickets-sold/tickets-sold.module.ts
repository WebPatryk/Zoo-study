import { Module } from '@nestjs/common';
import { TicketsSoldService } from 'src/tickets-sold/tickets-sold.service';
import { TicketsSoldController } from 'src/tickets-sold/tickets-sold.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketsSold } from 'src/tickets-sold/entities/tickets-sold.entity';
import { TicketsSoldSchema } from 'src/tickets-sold/schema/tickets-sold.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TicketsSold.name,
        schema: TicketsSoldSchema,
      },
    ]),
  ],
  controllers: [TicketsSoldController],
  providers: [TicketsSoldService],
})
export class TicketsSoldModule {}
