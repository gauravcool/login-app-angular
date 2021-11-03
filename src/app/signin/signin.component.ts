import { Component, VERSION } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  public signinForm: FormGroup;
  public accepted = false;
  public current = null;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

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
  }

  onSignin(): void {
  	event.preventDefault()
    this.accepted = true;
    if (this.signinForm.valid) {
      console.log(this.signinForm.value);
      localStorage.setItem("user-Data", JSON.stringify(this.signinForm.value));
      this.router.navigate(['dashboard']);
    }

  }

}
