import { Test, TestingModule } from '@nestjs/testing';
import { TicketsSoldController } from 'src/tickets-sold/tickets-sold.controller';
import { TicketsSoldService } from 'src/tickets-sold/tickets-sold.service';

describe('TicketsSoldController', () => {
  let controller: TicketsSoldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsSoldController],
      providers: [TicketsSoldService],
    }).compile();

    controller = module.get<TicketsSoldController>(TicketsSoldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
