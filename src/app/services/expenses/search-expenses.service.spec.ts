import { TestBed } from '@angular/core/testing';

import { SearchExpensesService } from './search-expenses.service';

describe('SearchExpensesService', () => {
  let service: SearchExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
