import { TestBed } from '@angular/core/testing';

import { PushSwService } from './push-sw.service';

describe('PushSwService', () => {
  let service: PushSwService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PushSwService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
