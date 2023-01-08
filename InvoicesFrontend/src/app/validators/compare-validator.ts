import { AbstractControl, ValidatorFn } from "@angular/forms";

export function compareValidator(): ValidatorFn{
    return (control: AbstractControl): { [key: string]: boolean }|null => {          
        if (!control.value) {
          return {'difference':true};
        }        
        let newPassword = control.get('newPassword')?.value;
        let reNewPassword = control.get('reNewPassword')?.value;        
        if(newPassword == reNewPassword) return null;
        else return {'difference':true};
    }
}