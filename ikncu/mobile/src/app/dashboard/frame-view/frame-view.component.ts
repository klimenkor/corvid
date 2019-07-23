import { Component, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, OnInit } from '@angular/core';
import { IDetectedFace } from 'src/app/model/motion';
import { Float } from 'aws-sdk/clients/comprehendmedical';
import { environment } from 'src/environments/environment';
import { IFace } from 'src/app/model/face';
import { FaceService } from 'src/app/service/face.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { IFaceCategorized, CategoryList } from 'src/app/model/category';

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
    private authService: AuthService
  ) { }

  @Input() frame: string;
  @Input() motion: string;
  @Input() faces: IDetectedFace[];
  @Output() close = new EventEmitter<boolean>();
  @ViewChild('canvas') public canvas: ElementRef;

  private cx: CanvasRenderingContext2D;

  categories = CategoryList;
  facesCategorized = [{ Id: '', CategoryId: '', Name: ''}] as IFaceCategorized[];

  facesBucketPath = 'https://s3.amazonaws.com/' + environment.facesBucket + '/';
  frameBucketPath = 'https://s3.amazonaws.com/' + environment.framesBucket + '/';
  userId = '';
  motionId = '';
  width = 800;
  height = 600;

  ngOnInit(): void {
    this.userId = this.authService.CognitoUser.id;
    this.motionId = this.motion;
    console.log(this.motionId)
    let i = 0;
    this.facesCategorized = [];
    this.faces.forEach(face => {
      this.facesCategorized.push({ Id: (i + 1).toString(), CategoryId: '0', Name: '' } as IFaceCategorized);
      i++;
    });
  }

  getEmotions(face: IDetectedFace){
    let result = '';
    face.Emotions.forEach(element => {
      if (element.Confidence > 50)
      {
        result += element.Type + ' ';
      }
    });
    return result;
  }

  onFaceCategoryChange(index) {
    console.log('frameViewComponent.onFaceCategoryChange: adding face...');
    // console.log(this.frame, index, this.facesCategorized[index]);
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

  onClickBack() {
    console.log('clicked back');
    this.close.emit(true);
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
      (this.canvas.nativeElement as HTMLCanvasElement).width = w;
      (this.canvas.nativeElement as HTMLCanvasElement).height = h;
      this.cx.drawImage(img, 0, 0, w, h);
      this.faces.forEach(face => {
        const box = face.Box;

        this.printDetails(this.cx, w as Float, h as Float, face);

        this.cx.rect(box.Left * w, box.Top * h, box.Width * w, box.Height * h);
        this.cx.strokeStyle = 'yellow';
        this.cx.stroke();
      });
    };
    img.src = this.frameBucketPath + this.frame;

  }
}

