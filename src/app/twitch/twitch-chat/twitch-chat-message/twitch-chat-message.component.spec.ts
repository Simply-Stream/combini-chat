import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchChatMessageComponent } from './twitch-chat-message.component';

describe('TwitchChatMessageComponent', () => {
  let component: TwitchChatMessageComponent;
  let fixture: ComponentFixture<TwitchChatMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwitchChatMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchChatMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
