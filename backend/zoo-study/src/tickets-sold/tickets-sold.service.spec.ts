import { Test, TestingModule } from '@nestjs/testing';
import { TicketsSoldService } from 'src/tickets-sold/tickets-sold.service';

describe('VisitorsService', () => {
  let service: TicketsSoldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketsSoldService],
    }).compile();

    service = module.get<TicketsSoldService>(TicketsSoldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
