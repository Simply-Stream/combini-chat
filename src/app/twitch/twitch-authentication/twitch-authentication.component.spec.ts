import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchAuthenticationComponent } from './twitch-authentication.component';

describe('TwitchAuthenticationComponent', () => {
  let component: TwitchAuthenticationComponent;
  let fixture: ComponentFixture<TwitchAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwitchAuthenticationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
