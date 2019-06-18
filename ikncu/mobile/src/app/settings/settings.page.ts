import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  tab = '';
  route: string;

  constructor(
    location: Location,
    router: Router
  ) {
    router.events.subscribe(val => {
      if (location.path() !== '') {
        this.route = location.path().split('/')[2];
      } else {
        this.route = 'profile';
      }
    });
  }

  ngOnInit() { }

}
