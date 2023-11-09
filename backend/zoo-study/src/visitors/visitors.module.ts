import { Module } from '@nestjs/common';
import { VisitorsService } from './visitors.service';
import { VisitorsController } from './visitors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Visitors, VisitorsSchema } from 'src/visitors/schema/visitors.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Visitors.name,
        schema: VisitorsSchema,
      },
    ]),
  ],
  controllers: [VisitorsController],
  providers: [VisitorsService],
})
export class VisitorsModule {}
