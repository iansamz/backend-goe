import { TestBed, inject } from '@angular/core/testing';

import { ShowNotificationsService } from './show-notifications.service';

describe('ShowNotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowNotificationsService]
    });
  });

  it('should be created', inject([ShowNotificationsService], (service: ShowNotificationsService) => {
    expect(service).toBeTruthy();
  }));
});
