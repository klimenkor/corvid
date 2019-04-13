import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  navLinks: any[];
  activeLinkIndex = 0;

  constructor(public router: Router) {
    this.navLinks = [
      {
          label: 'Basic',
          link: './basic',
          index: 0
      }, {
          label: 'Labels',
          link: './labels',
          index: 1
      }, {
          label: 'Cameras',
          link: './cameras',
          index: 2
      }, {
          label: 'Faces',
          link: './faces',
          index: 2
        }
      ];
  }

  ngOnInit(): void {
    console.log('SettingsComponent: OnInit...');

    this.router.events.subscribe((res) => {
        this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
        // console.log('!');

    });
    console.log(this.activeLinkIndex);
    // this.router.navigate(['./basic']);

  }

}
