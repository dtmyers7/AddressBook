import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Address Book';
  errorFound:boolean = false;

  displayMessage(isError:boolean){
    this.errorFound = isError;
  }
}
