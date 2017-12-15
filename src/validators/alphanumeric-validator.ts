import { AbstractControl, ValidatorFn} from '@angular/forms';

export function AlphaNumericValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {

       if ( control.value && control.value.length && !control.value.replace(/\s/g, '').match(/^[a-z0-9]+$/i) ){
            return {"invalidAlphaNumeric": true};
        }
        return null;

    }
};
