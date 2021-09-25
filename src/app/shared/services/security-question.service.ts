/**
 * Date: 16 September 2021
 * Title: security-question.service.ts
 * Author: Fred Marble
 * Description: Creating the Security Question Service.
 */

import { Injectable } from '@angular/core';
import { SecurityQuestion } from '../interfaces/security-question.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityQuestionService {

  constructor(private http: HttpClient) { }

  findAllSecurityQuestions(): Observable<any> {
    return this.http.get('/api/security-questions');
  }

  findSecurityQuestionById(questionId: string): Observable<any>{
    return this.http.get('/api/security-questions/' + questionId);
  }

  createSecurityQuestion(newSecurityQuestion: SecurityQuestion): Observable<any>{
    return this.http.post('/api/security-questions', {
      text: newSecurityQuestion.text
    })
  }

  updateSecurityQuestion(questionId: string, updatedSecurityQuestion: SecurityQuestion): Observable<any>{
    return this.http.put('/api/security-questions/'+ questionId, {
      text: updatedSecurityQuestion.text
    })
  }

  deleteSecurityQuestion(questionId: string): Observable<any>{
    return this.http.delete('/api/security-questions/'+ questionId);
  }
}
