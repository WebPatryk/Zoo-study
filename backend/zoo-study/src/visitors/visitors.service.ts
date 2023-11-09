import { Injectable } from '@nestjs/common';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Visitors,
  VisitorsDocument,
} from 'src/visitors/schema/visitors.schema';
import { Model } from 'mongoose';
import { UpdateVisitorDto } from 'src/visitors/dto/update-visitor.dto';

@Injectable()
export class VisitorsService {
  constructor(
    @InjectModel(Visitors.name)
    private readonly visitorsModel: Model<VisitorsDocument>,
  ) {}

  async create(createVisitorsDto: CreateVisitorDto): Promise<VisitorsDocument> {
    const visitor = new this.visitorsModel(createVisitorsDto);
    return visitor.save();
  }

  async findAll(): Promise<VisitorsDocument[]> {
    return this.visitorsModel.find().exec();
  }

  async findOne(id: string) {
    return this.visitorsModel.findById(id);
  }

  async update(
    id: string,
    updateVisitorsDto: UpdateVisitorDto,
  ): Promise<VisitorsDocument> {
    return this.visitorsModel.findByIdAndUpdate(id, updateVisitorsDto);
  }

  async remove(id: string) {
    return this.visitorsModel.findByIdAndRemove(id);
  }
}
