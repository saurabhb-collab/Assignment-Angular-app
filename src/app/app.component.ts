

import {apiService} from "./apiService"
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  myForm:FormGroup;
  msg:any;
  msg1:any
  allData:any
  showLink = true;
  showMsg = false;
  apiReturned = false;
  disabled = true;
  showalert = false;
  data:any
  count:number = 0;
  showconterr = false;
  hide = false
  
  createForm=function(){
      this.myForm=this.fb.group({         
        city:[null,[Validators.compose([Validators.required])]],
        panName:[null,[Validators.compose([Validators.required,Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}"),Validators.maxLength(10)])]],
        fullname:[null,[Validators.compose([Validators.required,Validators.min(2), Validators.maxLength(140)])]],
        email:[null,Validators.compose([Validators.required,Validators.email,Validators.maxLength(255)])],
        mobile:[null,[Validators.compose([Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])]],
        otp:[{value:null, disabled:true},([Validators.required,Validators.maxLength(4)])]
    })
  }

   constructor(private fb:FormBuilder,private http:HttpClient,private sr:apiService){this.createForm();}

 
 getOTP = function(allData){
            if(this.myForm.valid){
                 this.sr.GenerateOtp(allData).subscribe(e=>{
                 console.log(e.status) 
                 this.msg = e.status;
                 this.showMsg = true;
            if(e.status == "Success"){
                 this.myForm.get('otp').enable();
                 setTimeout(()=>{ this.disabled = false;}, 30000);
                 setTimeout(()=>{ this.showMsg = false;}, 10000);
             }
            if(e.status !== "Success"){
                this.showalert = true;
              }
            })
          } 
        }

 Resend = function(data){
       this.myForm.get('otp').disable();
       if(this.myForm.valid){
         this.sr.RegenerateOtp(data).subscribe(e=>{
         console.log(e.status) 
         this.msg1 = e.status;
         this.showMsg = true;
      if(e.status == "Success"){
        this.myForm.get('otp').enable();
        this.count++;
      if(this.count == 3){
          this.showMsg = false;
          this.showconterr = true; 
          this.disabled = true;
        }
       }
     })
    }
   }
 }
