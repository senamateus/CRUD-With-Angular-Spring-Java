import { TestBed } from '@angular/core/testing';

import { AcessoriosService } from './acessorios.service';

describe('AcessoriosService', () => {
  let service: AcessoriosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcessoriosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
