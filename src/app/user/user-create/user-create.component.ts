import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../user.service";
import { User } from "../User";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [UserService]
})
export class UserCreateComponent implements OnInit, OnDestroy {

  id: number;
  user: User;

  // form model
  userForm: FormGroup;
  private sub: any;

  // file upload  
  selectedFiles: FileList;
  currentFileUpload: File;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]),
      dateCreated: new FormControl({value: '', disabled: true}),
      dateUpdated: new FormControl({value: '', disabled: true}),
      jpegReference: new FormControl({value: '', disabled: true}, Validators.required),
      applicationStatus: new FormControl('', Validators.required),
    });

    if (this.id) { //edit form
      this.userService.findById(this.id).subscribe(
        user => {
          this.id = user.id;
          this.userForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            dateCreated: user.dateCreated,
            dateUpdated: user.dateUpdated,
            jpegReference: user.jpegReference,
            applicationStatus: user.applicationStatus,
          });
        }, error => {
          console.log(error);
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.id) {
        let user: User = new User(this.id,
          this.userForm.controls['firstName'].value,
          this.userForm.controls['lastName'].value,
          this.userForm.controls['email'].value,
          this.userForm.controls['dateCreated'].value,
          this.userForm.controls['dateUpdated'].value,
          this.userForm.controls['jpegReference'].value,
          this.userForm.controls['applicationStatus'].value);
          //this.userService.updateUser(user).subscribe();
          //this.upload();
          this.userService.putFileToStorage(user,this.selectedFiles.item(0)).subscribe();
      } else {
        let user: User = new User(null,
          this.userForm.controls['firstName'].value,
          this.userForm.controls['lastName'].value,
          this.userForm.controls['email'].value,
          this.userForm.controls['dateCreated'].value,
          this.userForm.controls['dateUpdated'].value,
          this.userForm.controls['jpegReference'].value,
          this.userForm.controls['applicationStatus'].value);
       // this.userService.saveUser(user).subscribe();
         
        //this.upload();
        
        this.userService.pushWithFile(user,this.selectedFiles.item(0)).subscribe();
      }

      this.userForm.reset();
     // this.router.navigate(['/user']);
    }
  }

  redirectUserPage() {
    this.router.navigate(['/user']);
  }

  // file upload
  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
      this.userForm.controls['jpegReference'].setValue(this.selectedFiles.item(0).name);
      //this.userForm.controls['fileUpload'].setValue(this.selectedFiles.item(0))
    } else {
      alert('invalid format!');
    }
  }

  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
   
    //this.userService.pushFileToStorage(this.currentFileUpload).subscribe()

    //this.selectedFiles = undefined
  }
}