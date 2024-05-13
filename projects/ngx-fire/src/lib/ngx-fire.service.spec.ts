import { TestBed } from '@angular/core/testing';

import { NgxFireService } from './ngx-fire.service';

describe('NgxFireService', () => {
  let service: NgxFireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxFireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
