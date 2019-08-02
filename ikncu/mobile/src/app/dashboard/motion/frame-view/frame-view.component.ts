import { Component, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, OnInit } from '@angular/core';
import { IDetectedFace, IMotion } from 'src/app/model/motion';
import { Float } from 'aws-sdk/clients/comprehendmedical';
import { environment } from 'src/environments/environment';
import { IFace } from 'src/app/model/face';
import { FaceService } from 'src/app/service/face.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { IFaceCategorized, CategoryList } from 'src/app/model/category';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Platform } from '@ionic/angular';

export interface DialogData {
  url: string;
  faces: IDetectedFace[];
}

@Component({
    selector: 'app-frame-view',
    templateUrl: './frame-view.component.html',
    styleUrls: ['./frame-view.component.css']
})
export class FrameViewComponent implements OnInit, AfterViewInit {

  constructor(
    private faceService: FaceService,
    private authService: AuthService,
    private platform: Platform,
    private screenOrientation: ScreenOrientation
  ) { }

  @Input() motion: IMotion;
  @Input() frame: string;

  @Output() close = new EventEmitter<boolean>();
  @ViewChild('canvas') public canvas: ElementRef;

  public width = 300;
  public height = 200;

  private cx: CanvasRenderingContext2D;

  categories = CategoryList;
  facesCategorized = [{ Id: '', CategoryId: '', Name: ''}] as IFaceCategorized[];

  facesBucketPath = 'https://s3.amazonaws.com/' + environment.facesBucket + '/';
  frameBucketPath = 'https://s3.amazonaws.com/' + environment.framesBucket + '/';
  userId = '';
  motionId = '';

  ngOnInit(): void {

    console.log('FrameView.ngOnInit:');
    console.log(this.motion);
    // this.screenOrientation.onChange().subscribe(
    //   () => {
    //       console.log("Orientation Changed");
    //   }
    // );

    this.userId = this.authService.CognitoUser.id;
    let i = 0;
    this.facesCategorized = [];
    this.motion.Faces.forEach(face => {
      this.facesCategorized.push({ Id: (i + 1).toString(), CategoryId: '0', Name: '' } as IFaceCategorized);
      i++;
    });
  }

  getEmotions(face: IDetectedFace){
    let result = '';
    face.Emotions.forEach(element => {
      if (element.Confidence > 50) {
        result += element.Type + ' ';
      }
    });
    return result;
  }

  onFaceCategoryChange(index) {
    console.log('frameViewComponent.onFaceCategoryChange: adding face...');
    const response = this.faceService.Add({
      Id: '',
      UserId: '',
      CategoryId: this.facesCategorized[index].CategoryId,
      Name: this.facesCategorized[index].Name,
      Frame: this.motionId + '/' + (index + 1)
    } as IFace);
    response.subscribe((res) => {
      console.log(res);
    });
  }


  getFaceByCoordinates(x,y) {
    let i = 0;
    let found = null;
    this.motion.Faces.forEach((face) => {
      const box = face.Box;
      if ( x > box.Left && x < box.Left + box.Width && y > box.Top && y < box.Top + box.Height) {
        found = i;
      }
      i++;
    });
    return found;
  }

  onClick(event: MouseEvent) {
    console.log('clicked back');
    console.log(event.clientX, event.clientY);
    console.log(this.getFaceByCoordinates(event.clientX, event.clientY));
    this.close.emit(true);

    // this.motion.People.

  }

  getGender(face: IDetectedFace) {
    return face.Gender.Confidence > 50 ? face.Gender.Value : '';
  }

  getSunglasses(face: IDetectedFace) {
    return face.Sunglasses.Confidence > 50 && face.Sunglasses.Value ? 'sunglasses' : '';
  }

  getEyeglasses(face: IDetectedFace) {
    return face.Eyeglasses.Confidence > 50 && face.Eyeglasses.Value ? 'eyeglasses' : '';
  }

  getSmile(face: IDetectedFace) {
    return face.Smile.Confidence > 50 ?
      face.Smile.Value ? 'smiling' : 'not smiling'
      : '';
  }

  printDetails(canvas, frameWidth, frameHeight, face: IDetectedFace) {
    console.log(face);
    const left = 1 * face.Box.Left;
    const top = 1 * face.Box.Top;
    const width = 1 * face.Box.Width;
    const height = 1 * face.Box.Height;
    const labelLeft = (left + width) * frameWidth + 10;
    const labelTop = top * frameHeight + 10;

    this.cx.font = '12px Arial';
    this.cx.fillStyle = 'yellow';
    const age = 'Age: ' + face.Age.Low + ' - ' + face.Age.High;

    const emotions = '';
    this.cx.fillText(age, labelLeft, labelTop);
    this.cx.fillText(this.getEmotions(face), labelLeft, labelTop + 15);
    this.cx.fillText(this.getGender(face), labelLeft, labelTop + 30);
    this.cx.fillText(this.getSmile(face), labelLeft, labelTop + 45);
    this.cx.fillText(this.getEyeglasses(face), labelLeft, labelTop + 60);
    this.cx.fillText(this.getSunglasses(face), labelLeft, labelTop + 75);
    this.cx.fillText(this.getSunglasses(face), labelLeft, labelTop + 75);
    // this.cx.fillText(labelLeft.toString(), labelLeft, labelTop + 100);
    // this.cx.fillText(labelTop.toString(), labelLeft, labelTop + 115);

  }

  public ngAfterViewInit() {

    console.log('FrameViewComponent.ngAfterViewInit');

    console.log(this.motion);
    console.log(this.frame);

    this.motionId = this.motion.Id;
    this.width = this.platform.width();
    this.height = this.width * 0.6;

    console.log(this.width, this.height);

    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    // set the width and height
    canvasEl.width = this.width;
    canvasEl.height = this.height;
    console.log(this.width, this.height);

    // set some default properties about the line
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    const img = new Image();
    img.onload = () => {
      // const w = img.width / 2;
      // const h = img.height / 2;
      const w = this.width;
      const h = this.height;

      (this.canvas.nativeElement as HTMLCanvasElement).width = w;
      (this.canvas.nativeElement as HTMLCanvasElement).height = h;
      this.cx.drawImage(img, 0, 0, w, h);
      this.motion.Faces.forEach(face => {
        const box = face.Box;

        this.printDetails(this.cx, w as Float, h as Float, face);

        this.cx.rect(box.Left * w, box.Top * h, box.Width * w, box.Height * h);
        this.cx.strokeStyle = 'yellow';
        this.cx.stroke();
      });
    };
    img.src = this.frameBucketPath + this.motion.Frame;

  }
}

