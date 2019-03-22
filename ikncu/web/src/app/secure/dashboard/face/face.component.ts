import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { CurrentUser } from 'src/app/model/_index';


@Component({
  selector: 'app-dashboard-face',
  templateUrl: './face.component.html',
  styleUrls: ['./face.component.css'],
  styles: [`
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.focused {
      background-color: #e6e6e6;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
  `]
})
export class FaceComponent implements AfterViewInit {

  currentUser: CurrentUser;
  bucketPath = 'https://s3.amazonaws.com/corvid-frames/';

  @ViewChild('myCanvas') canvas: ElementRef;
  public context: CanvasRenderingContext2D;

  constructor() { }

  ngAfterViewInit() {
    console.log('FaceComponent.ngOnInit');
    this.context = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');

    const img = new Image();

    const fx = [0.664271891117096, 0.4181285500526428, 0.7425548434257507];
    const fy = [0.21990881860256195, 0.6321630477905273, 0.1957627832889557];
    const fw = [0.031146444380283356, 0.04200395196676254, 0.04335761070251465];
    const fh = [0.06442948430776596, 0.11178691685199738, 0.09993976354598999];

    img.onload = () => {
      const w = img.width / 4;
      const h = img.height / 4;
      (<HTMLCanvasElement>this.canvas.nativeElement).width = w;
      (<HTMLCanvasElement>this.canvas.nativeElement).height = h;
      this.context.drawImage(img, 0, 0, w, h);

      for (let i = 0; i < 3; i++) {
        this.context.rect(fx[i] * w, fy[i] * h, fw[i] * w, fh[i] * h);
        this.context.strokeStyle = 'yellow';
        this.context.stroke();
      }
      };
      img.src = 'https://s3.amazonaws.com/corvid-frames/hi1rrucfjp9b89hmng2ajod3ee9cjjva002pfa81';

      // this.draw();
  }

}
