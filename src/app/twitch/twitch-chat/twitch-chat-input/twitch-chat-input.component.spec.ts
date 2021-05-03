import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchChatInputComponent } from './twitch-chat-input.component';

describe('TwitchChatInputComponent', () => {
  let component: TwitchChatInputComponent;
  let fixture: ComponentFixture<TwitchChatInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwitchChatInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchChatInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
