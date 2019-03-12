import { Component, Input, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface DialogData {
  url: string;
  faces: Object[];
}

@Component({
    selector: 'app-frame-view',
    templateUrl: './frame-view.component.html',
    styleUrls: ['./frame-view.component.css']
})
export class FrameViewComponent implements AfterViewInit {
  constructor(
    public dialogRef: MatDialogRef<FrameViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  width = 800;
  height = 600;
  frameUrl: string;

  @ViewChild('canvas') public canvas: ElementRef;
  private cx: CanvasRenderingContext2D;

  printDetails(canvas, frameWidth, frameHeight, face: any) {
    console.log(face);
    const left = face.box.left;
    const top = face.box.top;
    const width = face.box.width;
    const height = face.box.height;
    this.cx.font = '12px Arial';
    this.cx.fillStyle = 'yellow';
    const age = 'Age: ' + face.age.low + ' - ' + face.age.high;
    this.cx.fillText(age, (left + width) * frameWidth + 10, top * frameHeight + 10);

  }

  public ngAfterViewInit() {

    console.log('FrameViewComponent.ngAfterViewInit');
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

    const img = new Image();
    img.onload = () => {
      const w = img.width / 2;
      const h = img.height / 2;
      (<HTMLCanvasElement>this.canvas.nativeElement).width = w;
      (<HTMLCanvasElement>this.canvas.nativeElement).height = h;
      this.cx.drawImage(img, 0, 0, w, h);

      this.data.faces.forEach(face => {
        const box = face.box;
        console.log(box);

        this.printDetails(this.cx, w, h, face);

        this.cx.rect(box.left * w, box.top * h, box.width * w, box.height * h);
        this.cx.strokeStyle = 'yellow';
        this.cx.stroke();

      });
    };
    img.src = this.data.url;

  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}

