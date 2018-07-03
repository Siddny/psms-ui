import { TestBed, inject } from '@angular/core/testing';

import { EquipmentsService } from './equipments.service';

describe('EquipmentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EquipmentsService]
    });
  });

  it('should be created', inject([EquipmentsService], (service: EquipmentsService) => {
    expect(service).toBeTruthy();
  }));
});
