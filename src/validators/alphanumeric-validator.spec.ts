import {FormControl} from '@angular/forms';
import {AlphaNumericValidator} from '../validators/alphanumeric-validator';

describe('AlphaNumeric Validator', () => {

  let validatorFunction;  
  let control:FormControl;

  beforeEach(() => {

    validatorFunction =  AlphaNumericValidator();
    control = new FormControl();

  });

  it('should return null if value is valid', () => {

    control.setValue("abcd1234");
    let validationResponse = validatorFunction(control);

    expect(validationResponse).toBeNull();
  });

  it('should return an object if value is invalid', () => {
    
        control.setValue("@@@abcd1234");
        let validationResponse = validatorFunction(control);
    
        expect(validationResponse).not.toBeNull();
  });
});