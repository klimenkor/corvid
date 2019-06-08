import { Component, OnInit, Input, HostListener } from '@angular/core';
import { MotionComponent } from '../motion/motion.component';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss'],
})
export class DateSelectorComponent implements OnInit {

  constructor() { }
  range = { lower: 0, upper: 3};

  @Input() motions: MotionComponent;
  @HostListener('click')

  onFinish()
  {
    this.motions.changeRange(this.range.lower, this.range.upper);
  }

  ngOnInit() {}

}
