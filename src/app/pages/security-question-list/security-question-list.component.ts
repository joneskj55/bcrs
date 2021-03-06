/**
 * Date: 16 September 2021
 * Title: security-question-list.component
 * Author: Fred Marble
 * Description: Creating the Security Question List component.
 */

import { Component, OnInit } from '@angular/core';
import { DeleteRecordDialogComponent } from './../../shared/delete-record-dialog/delete-record-dialog.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SecurityQuestionService } from '../../shared/services/security-question.service';
import { SecurityQuestion } from '../../shared/interfaces/security-question.interface';

@Component({
  selector: 'app-security-question-list',
  templateUrl: './security-question-list.component.html',
  styleUrls: ['./security-question-list.component.css']
})
export class SecurityQuestionListComponent implements OnInit {

  securityQuestions: SecurityQuestion[];
  displayedColumns = ['question', 'functions']

  constructor(private http: HttpClient, private dialog: MatDialog, private securityQuestionService: SecurityQuestionService) {
    this.securityQuestionService.findAllSecurityQuestions().subscribe(res =>{
      this.securityQuestions = res['data'];
    }), err =>{
      console.log(err);
    }
  }

  ngOnInit(): void {
  }

  delete(recordId: string): void {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent,{
      data:{
        recordId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: `Are you sure you want to delete the selected security question?`
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm')
      {
        this.securityQuestionService.deleteSecurityQuestion(recordId).subscribe( res =>{
          console.log('Security Question deleted');
          this.securityQuestions = this.securityQuestions.filter(q => q._id !== recordId);
        })
      }
    })
  }

}
