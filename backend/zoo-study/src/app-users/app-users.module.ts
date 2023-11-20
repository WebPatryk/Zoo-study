import { Module } from '@nestjs/common';
import { AppUsersService } from './app-users.service';
import { AppUsersController } from './app-users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppUser } from 'src/app-users/entities/app-user.entity';
import { AllUsersSchema } from 'src/app-users/schema/app-users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AppUser.name,
        schema: AllUsersSchema,
      },
    ]),
  ],
  controllers: [AppUsersController],
  providers: [AppUsersService],
})
export class AppUsersModule {}
