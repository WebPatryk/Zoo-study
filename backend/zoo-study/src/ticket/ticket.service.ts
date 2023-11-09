import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from 'src/ticket/schema/ticket.schama';
import { UpdateTicketDto } from 'src/ticket/dto/update-ticket.dto';
import { CreateTicketDto } from 'src/ticket/dto/create-ticket.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name)
    private readonly ticketModel: Model<TicketDocument>,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<TicketDocument> {
    const employee = new this.ticketModel(createTicketDto);
    return employee.save();
  }

  async findAll(): Promise<TicketDocument[]> {
    return this.ticketModel.find().exec();
  }

  async findOne(id: string) {
    return this.ticketModel.findById(id);
  }

  async update(
    id: string,
    updateTicketDto: UpdateTicketDto,
  ): Promise<TicketDocument> {
    return this.ticketModel.findByIdAndUpdate(id, updateTicketDto);
  }

  async remove(id: string) {
    return this.ticketModel.findByIdAndRemove(id);
  }
}
