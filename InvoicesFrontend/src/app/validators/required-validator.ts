import { AbstractControl, ValidatorFn } from "@angular/forms";

export function requiredValidator(): ValidatorFn{
    return (control: AbstractControl): { [key: string]: boolean }|null => {              
        if (!control.value) {
          return {'invalid':true};          
        }
        var stringWithoutWhiteSpace = control.value.trim();
        if(stringWithoutWhiteSpace.length ==0) return {'invalid':true};
        else return null;
}
}