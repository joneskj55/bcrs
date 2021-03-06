/**
 * Date: 17 September 2021
 * Title: security-question-details.component
 * Author: Fred Marble
 * Modified By: George Henderson
 * Description: Creating the Security Question Details component.
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SecurityQuestionService } from '../../shared/services/security-question.service';
import { SecurityQuestion } from '../../shared/interfaces/security-question.interface';

@Component({
  selector: 'app-security-question-details',
  templateUrl: './security-question-details.component.html',
  styleUrls: ['./security-question-details.component.css']
})
export class SecurityQuestionDetailsComponent implements OnInit {
  question: SecurityQuestion;
  questionId: string;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router,
              private securityQuestionService: SecurityQuestionService) {
      this.questionId = this.route.snapshot.paramMap.get('id');

      this.securityQuestionService.findSecurityQuestionById(this.questionId).subscribe(res =>{
        this.question = res['data'];
      }, err => {
        console.log(err);
      }, ()=>{
        this.form.controls.text.setValue(this.question.text);
      })
    }

  ngOnInit(): void {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  saveQuestion(): void{
    const updatedSecurityQuestion = {} as SecurityQuestion;
    updatedSecurityQuestion.text = this.form.controls.text.value;

    this.securityQuestionService.updateSecurityQuestion(this.questionId, updatedSecurityQuestion).subscribe(res => {
      this.router.navigate(['/security-questions'])
    });
  }

  cancel(): void{
    this.router.navigate(['/security-questions'])
  }
}
