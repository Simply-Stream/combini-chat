import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchChatSelectorAddComponent } from './twitch-chat-selector-add.component';

describe('TwitchChatSelectorAddComponent', () => {
  let component: TwitchChatSelectorAddComponent;
  let fixture: ComponentFixture<TwitchChatSelectorAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwitchChatSelectorAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchChatSelectorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
