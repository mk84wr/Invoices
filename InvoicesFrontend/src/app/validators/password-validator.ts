import { AbstractControl, ValidatorFn } from "@angular/forms";

export function passwordValidator(): ValidatorFn{
    return (control: AbstractControl): { [key: string]: boolean }|null => {          
        if (!control.value) {
          return {'incorrect':true};
        }
        var reg =new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{5,40}$");       
        
        if(reg.test(control.value.trim())==false){
            return {'incorrect':true}
        }
        else return null;
    }
}