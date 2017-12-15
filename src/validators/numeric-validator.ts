import { AbstractControl, ValidatorFn} from '@angular/forms';


export function NumericValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {

       if ( control.value && control.value.length && !control.value.match(/^[0-9]+$/i) ){
            return {"invalidNumeric": true};
        }
        return null;

    }
};
