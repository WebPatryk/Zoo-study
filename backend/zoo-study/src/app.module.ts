import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { VisitorsModule } from './visitors/visitors.module';
import { TicketModule } from './ticket/ticket.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    EventsModule,
    AuthModule,
    UsersModule,
    VisitorsModule,
    TicketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
