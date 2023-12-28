import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TicketsSold } from 'src/tickets-sold/entities/tickets-sold.entity';
import { TicketsSoldDocument } from 'src/tickets-sold/schema/tickets-sold.schema';
import { CreateTicketsSoldDto } from 'src/tickets-sold/dto/create-tickets-sold.dto';
import { UpdateTicketsSoldDto } from 'src/tickets-sold/dto/update-tickets-sold.dto';

@Injectable()
export class TicketsSoldService {
  constructor(
    @InjectModel(TicketsSold.name)
    private readonly ticketsSoldModel: Model<TicketsSoldDocument>,
  ) {}

  async create(
    createVisitorsDto: CreateTicketsSoldDto,
  ): Promise<TicketsSoldDocument> {
    const visitor = new this.ticketsSoldModel(createVisitorsDto);
    return visitor.save();
  }

  async findAll(): Promise<TicketsSoldDocument[]> {
    return this.ticketsSoldModel.find().exec();
  }

  async findOne(id: string) {
    return this.ticketsSoldModel.findById(id);
  }

  async update(
    id: string,
    updateTicketsSoldsDto: UpdateTicketsSoldDto,
  ): Promise<TicketsSoldDocument> {
    return this.ticketsSoldModel.findByIdAndUpdate(id, updateTicketsSoldsDto);
  }

  async remove(id: string) {
    return this.ticketsSoldModel.findByIdAndRemove(id);
  }
}
