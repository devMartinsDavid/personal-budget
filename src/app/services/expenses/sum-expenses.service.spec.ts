import { TestBed } from '@angular/core/testing';

import { SumExpensesService } from './sum-expenses.service';

describe('SumExpensesService', () => {
  let service: SumExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SumExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
