import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {

  constructor() { }
  feedbackText = '';
  showValidation = false;
  showPopup = false;

  ngOnInit(): void {
  }
  submitFeedback() {
    if (!this.feedbackText.trim())
    {
      this.showValidation = true;
    }
    else
    {
      this.showValidation = false;
      this.showPopup = true;
    }
  }
  closePopup()
  {
    this.showPopup = false;
    this.feedbackText = '';
  }
}
