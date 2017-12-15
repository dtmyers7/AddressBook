import {FormControl} from '@angular/forms';
import {NumericValidator} from '../validators/numeric-validator';

describe('Numeric Validator', () => {

  let validatorFunction;  
  let control:FormControl;

  beforeEach(() => {

    validatorFunction =  NumericValidator();
    control = new FormControl();

  });

  it('should return null if value is valid', () => {

    control.setValue("1234");
    let validationResponse = validatorFunction(control);

    expect(validationResponse).toBeNull();
  });

  it('should return an object if value is invalid', () => {
    
        control.setValue("abcd");
        let validationResponse = validatorFunction(control);
    
        expect(validationResponse).not.toBeNull();
  });
});