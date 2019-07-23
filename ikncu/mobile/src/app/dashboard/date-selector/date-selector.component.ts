import { Component, OnInit, Input } from '@angular/core';
import { IonRange } from '@ionic/angular';
import { DashboardComponent } from '../dashboard.component';

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

  @Input() dashboard: DashboardComponent;

  ngOnInit() {
    console.log('DateSelectorComponent.ngOnInit');
    this.onSelectToday(true);
  }

  onRangeChange(event: CustomEvent<IonRange>) {
    console.log('onRangeChange');
  }

  isChecked(lower) {
    return lower === this.hours.lower;
  }

  onSelectHours(lower) {
    console.log('DateSelectorComponent.onSelectHours');
    this.hours.lower = lower;
    this.hours.upper = lower + 6;

    const from = this.dateTimeToString(this.date, this.hours.lower);
    const to = this.dateTimeToString(this.date, this.hours.upper);
    this.dashboard.refreshData(from, to);
  }

  onSelectDayBack() {
    console.log('DateSelectorComponent.onSelectDayBack');
    this.date.setDate(this.date.getDate() - 1);
    const from = this.dateTimeToString(this.date, this.hours.lower);
    const to = this.dateTimeToString(this.date, this.hours.upper);
    this.dashboard.refreshData(from, to);
  }

  onSelectNextDay() {
    console.log('DateSelectorComponent.onSelectNextDay');
    this.date.setDate(this.date.getDate() + 1);
    const from = this.dateTimeToString(this.date, this.hours.lower);
    const to = this.dateTimeToString(this.date, this.hours.upper);
    this.dashboard.refreshData(from, to);
  }

  onSelectToday(resetTime = false) {
    console.log('DateSelectorComponent.onSelectToday');
    this.date = new Date();
    if (resetTime) {
      const lh = 6 * Math.floor(this.date.getHours() / 6);
      this.hours = { lower: lh, upper: lh + 6};
    }
    console.log(this.hours);
    const from = this.dateTimeToString(this.date, this.hours.lower);
    const to = this.dateTimeToString(this.date, this.hours.upper);
    this.dashboard.refreshData(from, to);
  }

  dateToString(date: Date) {
    return date.getFullYear() + String(date.getMonth() + 1).padStart(2, '0') + String(date.getDate()).padStart(2, '0');
  }

  dateTimeToString(date, hour) {
    return this.dateToString(date) + String(hour).padStart(2, '0') + '0000';
  }



}
