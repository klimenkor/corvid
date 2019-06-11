import { Component, OnInit, Input, HostListener } from '@angular/core';
import { MotionComponent } from '../motion/motion.component';
import { IonRange } from '@ionic/angular';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss'],
})
export class DateSelectorComponent implements OnInit {

  date: Date = new Date();
  hours = { lower: 0, upper: 6};
  previousHours = this.hours;

  constructor() { }

  @Input() motions: MotionComponent;

  ngOnInit() {
    console.log('DateSelectorComponent.ngOnInit');
    this.onSelectToday();
  }

  onRangeChange(event: CustomEvent<IonRange>) {
    console.log('onRangeChange');
  }

  onSelectHours(lower) {
    console.log('DateSelectorComponent.onSelectHours');
    this.hours.lower = lower;
    this.hours.upper = lower + 6;

    const from = this.dateTimeToString(this.date, this.hours.lower);
    const to = this.dateTimeToString(this.date, this.hours.upper);
    this.motions.refreshData(from, to);
  }

  onSelectDayBack() {
    console.log('DateSelectorComponent.onSelectDayBack');
    this.date.setDate(this.date.getDate() - 1);
    const from = this.dateTimeToString(this.date, this.hours.lower);
    const to = this.dateTimeToString(this.date, this.hours.upper);
    this.motions.refreshData(from, to);
  }

  onSelectNextDay() {
    console.log('DateSelectorComponent.onSelectNextDay');
    this.date.setDate(this.date.getDate() + 1);
    const from = this.dateTimeToString(this.date, this.hours.lower);
    const to = this.dateTimeToString(this.date, this.hours.upper);
    this.motions.refreshData(from, to);
  }

  onSelectToday() {
    console.log('DateSelectorComponent.onSelectToday');
    this.date = new Date();
    if (this.hours === undefined) {
      this.hours = { lower: 0, upper: 3};
    }
    const from = this.dateTimeToString(this.date, this.hours.lower);
    const to = this.dateTimeToString(this.date, this.hours.upper);
    this.motions.refreshData(from, to);
  }

  dateToString(date: Date) {
    return date.getFullYear() + String(date.getMonth() + 1).padStart(2, '0') + String(date.getDate()).padStart(2, '0');
  }

  dateTimeToString(date, hour) {
    return this.dateToString(date) + String(hour).padStart(2, '0') + '0000';
  }



}
