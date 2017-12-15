import { Injectable } from '@angular/core';

@Injectable()
export class HttpActionResponse {
    validationErrors : ValidationErrors
    responseData : any
}

class ValidationErrors{
    fieldErrors : FieldError[]
    globalErrors : string[]
}

class FieldError{
    fieldName: string
    errorMessage: string
}
