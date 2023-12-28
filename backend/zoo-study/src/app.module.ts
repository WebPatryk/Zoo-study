import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitorsModule } from './visitors/visitors.module';
import { TicketModule } from './ticket/ticket.module';
import { UsersModule } from 'src/users/users.module';
import { AppUsersModule } from 'src/app-users/app-users.module';
import { AuthModule } from 'src/auth/auth.module';
import { TicketsSoldModule } from 'src/tickets-sold/tickets-sold.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    EventsModule,
    AuthModule,
    UsersModule,
    VisitorsModule,
    TicketModule,
    TicketsSoldModule,
    AppUsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
