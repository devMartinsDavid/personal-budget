import { TestBed } from '@angular/core/testing';

import { AddExpensesService } from './add-expenses.service';

describe('AddExpensesService', () => {
  let service: AddExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
