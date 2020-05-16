import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../data/user-settings';
import { NgForm, NgModel } from '@angular/forms';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  //originalUserSettings is used to keep track of a set of default values for the userSettings object.
  //This is used in case the user uses the back or cancel button and to protect our original data values.
  originalUserSettings: UserSettings = {
    name: null,
    emailOffers: null,
    interfaceStyle: null,
    subscriptionType: null,
    notes: null
  };

  //userSettings is a UserSettings object that hold the values/data used in the HTML file for this component.
  //The spread operator, or ..., allows us to copy each value in the originalUserSettings object into this object.
  //If these objects held object values, this would not work properly since this is primarily used to hold primitive values.
  //Lodash can be used to make deep copies of objects if needed.
  userSettings: UserSettings = {
    ...this.originalUserSettings
  }

  postError = false;
  postErrorMessage = '';
  subscriptionTypes: Observable<string[]>;

  singleModel = "On";

  constructor(private dataService: DataService) { }

  onHttpError(errorResponse: any)
  {
    console.log('error ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  //onSubmit is used to perform validation on a form in the HTML file before it is submitted.
  //It is called on the "ngSubmit" property in the "form" HTML tag.
  //form.valid is a boolean value that will return true if the form is valid.
  onSubmit(form: NgForm)
  {
    console.log("in onSubmit: ", form.valid);

    if(form.valid)
    {
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        result => console.log("success: ", result),
        error => this.onHttpError(error)
      );
    }
    else{
      this.postError = true;
      this.postErrorMessage = "Please fix the above errors";
    }
  }

  //onBlur is used to perform an action when a user looks and then leaves a field.
  //It is called in the "blur()" property in the "input" HTML tag.
  //field.valid is a boolean value that will return true when a field is given a valid value.
  onBlur(field: NgModel)
  {
    console.log("in onBlur: ", field.valid);
  }

  ngOnInit(): void 
  {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();

    console.log("this is working");
  }

}
