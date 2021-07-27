import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-twitch-input',
  template: `
    <ng-container [ngSwitch]="type">
    <textarea *ngSwitchCase="'textarea'" class="twitch-textarea form-control" maxlength="{{maxLength}}"
              [rows]="rows"
              [placeholder]="placeholder"
              [disabled]="disabled"
              [(ngModel)]="input"
              (keyup.enter)="onKeyUpEnter()"></textarea>

      <input *ngSwitchCase="'text'" class="twitch-text form-control"
             [placeholder]="placeholder"
             [disabled]="disabled"
             [(ngModel)]="input"
             (keyup.enter)="onKeyUpEnter()">
    </ng-container>
  `,
  styleUrls: ['./twitch-input.component.scss'],
})
export class TwitchInputComponent {
  @Input()
  public label: string;

  @Input()
  public placeholder: string;

  @Input()
  public rows: number;

  @Input()
  public maxLength: number = 500;

  @Input()
  public disabled: boolean = false;

  @Input()
  public type: string = 'textarea';

  @Output()
  public keyUpEnter = new EventEmitter<void>();

  @Input()
  get input(): string {
    return this.inputValue;
  }

  set input(value: string) {
    this.inputValue = value;
    this.inputChange.emit(this.inputValue);
  }

  @Output()
  public inputChange = new EventEmitter<string>();

  public inputValue = '';

  onKeyUpEnter(): void {
    this.keyUpEnter.emit();
  }
}
