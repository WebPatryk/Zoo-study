import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppUserDto } from './dto/create-app-user.dto';
import { UpdateAppUserDto } from './dto/update-app-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppUser } from 'src/app-users/entities/app-user.entity';
import { AppUsersDocument } from 'src/app-users/schema/app-users.schema';

@Injectable()
export class AppUsersService {
  constructor(
    @InjectModel(AppUser.name)
    private readonly appUsersDocumentModel: Model<AppUsersDocument>,
  ) {}

  async create(createTicketDto: CreateAppUserDto): Promise<AppUsersDocument> {
    const employee = new this.appUsersDocumentModel(createTicketDto);
    return employee.save();
  }

  async findAll(): Promise<AppUsersDocument[]> {
    return this.appUsersDocumentModel.find().exec();
  }

  async findOne(id: string) {
    return this.appUsersDocumentModel.findById(id);
  }

  async update(
    id: string,
    updateTicketDto: UpdateAppUserDto,
  ): Promise<AppUsersDocument> {
    return this.appUsersDocumentModel.findByIdAndUpdate(id, updateTicketDto);
  }

  async remove(id: string) {
    return this.appUsersDocumentModel.findByIdAndRemove(id);
  }
  async addEventToUser(userId: string, newEvent: any): Promise<any> {
    try {
      const user = await this.appUsersDocumentModel.findById(userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      user.calendarEvents.push(newEvent);

      return await user.save();
    } catch (error) {
      console.error('Error adding event to user:', error);
      throw error;
    }
  }
  async findOneByEmail(email: string) {
    return this.appUsersDocumentModel.findOne({ email });
  }
}
