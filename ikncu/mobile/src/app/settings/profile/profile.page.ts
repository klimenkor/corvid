import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public profile = { id: '12121212', name: 'Roman KLimenko', email: 'klimenkor@gmail.com', tier: 'Basic' };

  constructor() { }

  ngOnInit() {
  }

}
