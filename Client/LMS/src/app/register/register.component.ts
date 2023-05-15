import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  isInstructor: string = 'no';
  showConfirmationMessage: boolean = false;
  showFailureMessage: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  closeConfirmationMessage() {
    this.showConfirmationMessage = false;
  }

  closeFailureMessage() {
      this.showFailureMessage = false;
    }

  onSubmit() {
    const formData = {
      name: this.name,
      email: this.email,
      password: this.password,
    };
    console.log(formData);
    console.log(this.isInstructor);

    const apiEndpoint = this.isInstructor === 'yes' ? 'http://localhost:8080/api/instructor/register' : 'http://localhost:8080/api/student/register';

    console.log(apiEndpoint)

    this.http.post(apiEndpoint, formData)
      .subscribe(
        res => {
                  console.log("Confirmation Message");
                  console.log(res);
                  console.log(this.showConfirmationMessage);
                  this.showConfirmationMessage = true;
                  console.log(this.showConfirmationMessage);
                  setTimeout(() => {
                    this.router.navigate(['/login']);
                  }, 4000); // Redirect to /login after 4 seconds
                },
        err => {
          this.showFailureMessage = true;
          console.log(err);
        }
      );
  }
}
