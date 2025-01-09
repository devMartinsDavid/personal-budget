import { TestBed } from '@angular/core/testing';

import { ManagerExpensesService } from './manager-expenses.service';

describe('ManagerExpensesService', () => {
  let service: ManagerExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
