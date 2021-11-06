import { Component, VERSION } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SigninService } from '../services/signin.service';
let SIGNIN_API = 'http://ec2-18-195-130-123.eu-central-1.compute.amazonaws.com:8080/auth/realms/mixit/protocol/openid-connect/token';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  public signinForm: FormGroup;
  public accepted = false;
  public current = null;

  constructor(private formBuilder: FormBuilder, private router: Router, private signinservice: SigninService, private httpClient: HttpClient) { //dependency injection to make the http work, we need to inject one HttpClient class 
     // this.httpClient.get('http://jsonplaceholder.typicode.com/users');

     const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
      
      headers.append('Authorization', 'Basic bWl4aXQtd2ViYXBwLTAxOmY5YzY2NGMwLTlhNjEtNDA0OS05NjQ3LTRkZWQzMjZiMjBmZg==');
      
      const body = 'grant_type=password&username=firstAngularUser@test.de&password=Test123';

      this.httpClient.post(`http://ec2-18-195-130-123.eu-central-1.compute.amazonaws.com:8080/auth/realms/mixit/protocol/openid-connect/token`, body, this.getArgHeaders()).subscribe((res) => console.log('POST call: '+res));
  }

  private getArgHeaders(): any {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Authorization': 'Basic bWl4aXQtd2ViYXBwLTAxOmY5YzY2NGMwLTlhNjEtNDA0OS05NjQ3LTRkZWQzMjZiMjBmZg=='
        })
      };
      return httpOptions;
  }

  ngOnInit(): void {
  	this.signinForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$"
          )
        ]
      ]
    });
  }

  get formControl() {
    return this.signinForm.controls;
    // headers.set('Access-Control-Allow-Origin', '*');
      // headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  }

  onSignin(): void {
  	// event.preventDefault()
    this.accepted = true;
    
    
    if (this.signinForm.valid) {
      console.log(this.signinForm.value);
      localStorage.setItem("user-Data", JSON.stringify(this.signinForm.value));


      // this.httpClient.post('https://reqres.in/api/posts', )
    }

  }

}
