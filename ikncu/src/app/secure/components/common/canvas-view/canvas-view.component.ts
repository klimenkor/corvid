import { Component, Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas',
  template: '<canvas #canvas></canvas>',
  styles: ['canvas { border: 1px solid #000; }']
})
export class CanvasViewComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas: ElementRef;

  @Input() public width = 400;
  @Input() public height = 400;

  private cx: CanvasRenderingContext2D;

  public ngAfterViewInit() {
    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    // set the width and height
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    // set some default properties about the line
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    const fx = [0.664271891117096, 0.4181285500526428, 0.7425548434257507];
    const fy = [0.21990881860256195, 0.6321630477905273, 0.1957627832889557];
    const fw = [0.031146444380283356, 0.04200395196676254, 0.04335761070251465];
    const fh = [0.06442948430776596, 0.11178691685199738, 0.09993976354598999];

    const img = new Image();
    img.onload = () => {
      const w = img.width / 4;
      const h = img.height / 4;
      (<HTMLCanvasElement>this.canvas.nativeElement).width = w;
      (<HTMLCanvasElement>this.canvas.nativeElement).height = h;
      this.cx.drawImage(img, 0, 0, w, h);

      for (let i = 0; i < 3; i++) {
        this.cx.rect(fx[i] * w, fy[i] * h, fw[i] * w, fh[i] * h);
        this.cx.strokeStyle = 'yellow';
        this.cx.stroke();
      }
    };
    img.src = 'https://s3.amazonaws.com/corvid-frames/hi1rrucfjp9b89hmng2ajod3ee9cjjva002pfa81';

  }
}

