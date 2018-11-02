import { Component, OnInit } from '@angular/core';
import { ISetting } from 'src/app/model/_index';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  setting: ISetting = null;
  userId = '111111';

  constructor(
    public amplifyService: AmplifyService ) {

      this.amplifyService = amplifyService;
    }

  ngOnInit() {
    this.setting = null;
    // this.rest.getSettings(this.userId).subscribe((data: ISetting[]) => {
    //     this.setting = data[0];
    // });
  }

}
