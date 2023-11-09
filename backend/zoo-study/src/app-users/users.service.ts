import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/app-users/schema/user.schema';
import { CreateUserDto } from 'src/app-users/dto/create-user.dto';
import { UpdateUserDto } from 'src/app-users/dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUsersDto: CreateUserDto): Promise<UserDocument> {
    const user = new this.userModel(createUsersDto);
    return user.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return this.userModel.findById(id);
  }

  async update(id: string, updateUserto: UpdateUserDto): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(id, updateUserto);
  }

  async remove(id: string) {
    return this.userModel.findByIdAndRemove(id);
  }
}
