import { Component, inject } from '@angular/core';
import { UserListComponent } from "../user-list/user-list.component";
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShowValidationsComponent } from "../shared/show-validations/show-validations.component";
import { EmailRegex } from '../app.constants';
import { UserService } from '../services/user.service';
import { HotToastService } from '@ngxpert/hot-toast';



@Component({
  selector: 'app-user-login',
  imports: [UserListComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent {
  
private formBuilder = inject(FormBuilder);


  showUserList: boolean = false;
  isLoginFormSubmitted: boolean = false;

  userLoginForm = this.formBuilder.group({
    email: ['',[
      Validators.email,
      Validators.required,
      Validators.pattern(EmailRegex),
      Validators.maxLength(50)
    ]],
    password: ['',[
      Validators.maxLength(30),
      Validators.required
    ]]
  })

  constructor(
    private userService: UserService, 
    private hotToastService: HotToastService,
    private router: Router
  ) {

  }


  onSubmit(evt: Event) {
    evt.preventDefault();
    this.isLoginFormSubmitted = true;
    
    if(!this.userLoginForm.valid) {
      return;
    }

    const formData : Partial<{ email:string | null , password:string | null }> = this.userLoginForm.value;
    this.userService.loginUserCall(formData).subscribe({
      next:(data)=>{
        localStorage.setItem('user_token',JSON.stringify(data))
        this.hotToastService.success(`
          Successful Login!
          Redirect soon to Profile Page 
        `)
        this.router.navigate(['/user']);

      },
      error:(err)=>{
        console.log(err)
        this.hotToastService.error("Invalid Credentials!")
      }
    })
  }

}
