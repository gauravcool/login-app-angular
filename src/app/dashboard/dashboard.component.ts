import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { SigninComponent } from '../signin/signin.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public getResponse;
  public cont;
  public recipeCountType;
  public innovateCountType;
  public taskCountType;
  public recipeHeader;
  public innovate;
  public task;
  public postError;

  private data$: Observable<any>;

  constructor(private router: Router, private httpClient: HttpClient) { 
      const body = 'grant_type=password&username=firstAngularUser@test.de&password=Test123';
  }
   @Input() message: string;

    private getArgHeadersForPost(): any {
        const httpOptionsGet = {
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'Basic bWl4aXQtd2ViYXBwLTAxOmY5YzY2NGMwLTlhNjEtNDA0OS05NjQ3LTRkZWQzMjZiMjBmZg=='
          })
        };
        return httpOptionsGet;
    }

    private getArgHeadersForGet(reqHeader): any {
        const httpOptionsPost = {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + reqHeader
          })
        };
        return httpOptionsPost;
    }

    getData$(): Observable<any> {
        return this.data$;
    }

  ngOnInit(): void {
    console.log(this.message);

    const body = 'grant_type=password&username=firstAngularUser@test.de&password=Test123';

    this.httpClient.post(`http://ec2-18-195-130-123.eu-central-1.compute.amazonaws.com:8080/auth/realms/mixit/protocol/openid-connect/token`, body, this.getArgHeadersForPost()).subscribe((res) => {
        console.log(JSON.stringify(res).split('"')[3]);
        return this.httpClient.get(`http://developia-backend-test.eu-central-1.elasticbeanstalk.com/api/d47015d9-baf6-4b69-8c57-47e2d0f9aef0/dashboard?size=5&page=0`, this.getArgHeadersForGet(JSON.stringify(res).split('"')[3])).subscribe((getres) => {
          
          this.getResponse = JSON.parse(JSON.stringify(getres));
          
          console.log(this.getResponse);

          this.cont = JSON.stringify(getres);
          this.recipeCountType = JSON.stringify(this.getResponse.recipeHeaderCount);
          this.innovateCountType = JSON.stringify(this.getResponse.innovationCount);
          this.taskCountType = JSON.stringify(this.getResponse.taskCount);
          this.recipeHeader = JSON.stringify(this.getResponse.recipeHeaders);
          this.innovate = JSON.stringify(this.getResponse.innovations);
          this.task = JSON.stringify(this.getResponse.tasks);
        })
      }, (error) => this.postError = JSON.stringify(error.message));
  }

  onLogOut(): void {
  	event.preventDefault();
    this.router.navigate(['']);
    // window.location.reload();
  }

  // signin = SigninComponent.getResponse;

}
