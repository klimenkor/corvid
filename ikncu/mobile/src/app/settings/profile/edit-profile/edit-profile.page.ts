import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  public profile = { id: '12121212', name: 'Roman KLimenko', email: 'klimenkor@gmail.com', tier: 'Basic' };

  constructor() { }

  ngOnInit() {
  }

}
