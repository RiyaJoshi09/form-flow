import { Component, OnInit, OnDestroy, Input, WritableSignal } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.html',
  styleUrl: './timer.css',
})
export class Timer {
  @Input() timeLeft!: WritableSignal<number>;
  displayTime = '02:00';
  private sub!: Subscription;

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.sub = interval(1000).subscribe(() => {
      if (this.timeLeft() > 0) {
        this.timeLeft.set(this.timeLeft()-1);
        this.updateDisplay();
      } else {
        this.sub.unsubscribe();
      }
    });
  }

  updateDisplay() {
    const minutes = Math.floor(this.timeLeft() / 60);
    const seconds = this.timeLeft() % 60;

    this.displayTime = `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
