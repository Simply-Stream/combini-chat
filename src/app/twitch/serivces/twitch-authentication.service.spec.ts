import { TestBed } from '@angular/core/testing';

import { TwitchAuthenticationService } from './twitch-authentication.service';

describe('TwitchAuthenticationService', () => {
  let service: TwitchAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwitchAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
