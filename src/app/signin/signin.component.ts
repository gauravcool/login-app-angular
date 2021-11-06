import { Component, VERSION, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
let SIGNIN_API_POST = 'http://ec2-18-195-130-123.eu-central-1.compute.amazonaws.com:8080/auth/realms/mixit/protocol/openid-connect/token';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent {

  public signinForm: FormGroup;
  public accepted = false;
  public current = null;
  public getResponse;

  private data$: Observable<any>;

  @Output() redirect:EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private router: Router, private httpClient: HttpClient) { }

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

  ngOnInit(): void {
  	this.signinForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required, Validators.pattern("firstAngularUser@test.de")]],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern("Test123")
        ]
      ]
    });
  }

  message = 'ad';

  get formControl() {
    return this.signinForm.controls;
  }

  onSignin(): void {
  	event.preventDefault()
    this.accepted = true;
    
    if(this.signinForm.value.email == 'firstAngularUser@test.de' && this.signinForm.value.password == 'Test123') {
      console.log(this.signinForm.value);
      localStorage.setItem("user-Data", JSON.stringify(this.signinForm.value));
      this.router.navigate(['dashboard']);
    }

  }



}
