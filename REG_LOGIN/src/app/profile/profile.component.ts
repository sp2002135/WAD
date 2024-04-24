import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userData: any;
  username: string;

  constructor() {
    // Retrieve user data from local storage
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.username = this.userData.username;
  }
}
