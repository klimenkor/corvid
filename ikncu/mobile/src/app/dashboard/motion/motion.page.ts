import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MotionService } from 'src/app/service/motion.service';
import { NavController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { IMotionsResult, IMotionResult, IMotion, IDetectedFace } from 'src/app/model/motion';
import { FaceService } from 'src/app/service/face.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { CategoryList, IFaceCategorized } from 'src/app/model/category';
import { Float } from 'aws-sdk/clients/comprehendmedical';
import { environment } from 'src/environments/environment';
import { IFace, IBox } from 'src/app/model/face';

@Component({
  selector: 'app-motion',
  templateUrl: './motion.page.html',
  styleUrls: ['./motion.page.scss'],
})
export class MotionPage implements OnInit, AfterViewInit {

  @ViewChild('canvas') public canvas: ElementRef;

  public width = 300;
  public height = 200;

  private cx: CanvasRenderingContext2D;

  categories = CategoryList;
  facesCategorized = [{ Id: '', CategoryId: '', Name: ''}] as IFaceCategorized[];

  facesBucketPath = 'https://s3.amazonaws.com/' + environment.facesBucket + '/';
  frameBucketPath = 'https://s3.amazonaws.com/' + environment.framesBucket + '/';
  userId = '';
  motionId: string;

  
  isLoading = false;
  motion: IMotion = { Id: null, CameraId: null, Occurred: null, Frame: null, Labels: [], Faces: [], People: [] };
  faceBoxes: IBox[];

  constructor(
    private route: ActivatedRoute,
    private motionService: MotionService,
    private navCtrl: NavController,
    private faceService: FaceService,
    private authService: AuthService,
    private platform: Platform,

    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
    console.log('MotionPage.ngOnInit');

    this.userId = this.authService.CognitoUser.id;


    // this.route.paramMap.subscribe(paramMap => {
    //   if (!paramMap.has('motionId')) {
    //     this.navCtrl.navigateBack('/dashboard');
    //     return;
    //   }
    //   this.motionId = paramMap.get('motionId');
    //   this.motion = this.motionService.GetFromCache(this.motionId);
    //   console.log(this.motion);
    // });
  }

  onClose(event) {

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


  getFaceByCoordinates(x, y) {
    let i = 0;
    let found = null;
    this.facesCategorized.forEach((face) => {
      const b = face.Box;
      if ( x > b.Left && x < b.Right && y > b.Top && y < b.Bottom) {
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
    // this.close.emit(true);

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

    console.log('MotionPage.ngAfterViewInit');

    this.width = this.platform.width();
    this.height = this.width * 0.6;

    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('motionId')) {
        this.navCtrl.navigateBack('/dashboard');
        return;
      }
      this.motionId = paramMap.get('motionId');
      console.log('MotionId=' + this.motionId);
      this.isLoading = true;
      this.motionService.Get(this.motionId,
        (response: IMotionResult) => {
          if (response.Item === null) {
            return;
          }
          console.log('...motion loaded for ID ' + this.motionId.toString());
          this.motion = response.Item;
          console.log(this.motion);

          let i = 0;
          this.facesCategorized = [];

            

          this.motion.Faces.forEach(face => {

            const b = face.Box;
            const left = b.Left * this.width;
            const right = (b.Left + b.Width) * this.width;
            const top = b.Top * this.height;
            const bottom = (b.Top + b.Height) * this.height;
  
            this.facesCategorized.push({
              Id: (i + 1).toString(),
              CategoryId: '0',
              Name: '',
              Box: { Left: left, Right: right, Top: top, Bottom: bottom}
            } as IFaceCategorized);
            i++;
          });

          this.isLoading = false;

          console.log(this.facesCategorized);

          // get the context
          const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
          this.cx = canvasEl.getContext('2d');
          console.log(canvasEl.parentNode.parentElement)

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

      });
    });



  }

}
