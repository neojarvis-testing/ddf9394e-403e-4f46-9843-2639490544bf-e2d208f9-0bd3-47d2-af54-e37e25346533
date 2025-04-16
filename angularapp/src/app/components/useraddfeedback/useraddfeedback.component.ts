import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {


  feedback:Feedback={
    UserId: 0,
    FeedbackText: '',
    Date: undefined,
  
  };
  constructor(private feedbackService:FeedbackService,private router:Router,private route:ActivatedRoute) { }


  ngOnInit(): void {
    this.feedback.UserId = +localStorage.getItem('userId');
    this.feedback.Date = new Date();

  }


  addFeedback()

  {
    this.feedbackService.sendFeedback(this.feedback).subscribe(()=>
    {
      this.router.navigate(['customer/viewFeedback']);
    });
  }
}
