import { Component, OnInit, AfterViewChecked, EventEmitter, Output } from '@angular/core';
import {AsyncValidatorFn, ValidationErrors, Validators, FormArray, FormGroup, FormControl, FormBuilder, AbstractControl} from '@angular/forms';
import {AlphaNumericValidator} from '../validators/alphanumeric-validator';
import {NumericValidator} from '../validators/numeric-validator';
import {HttpService} from '../services/http-service';
import {ZipCode} from '../model/zip-code';
import {Address} from '../model/address';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
    selector: 'address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.css']
})

export class AddressComponent implements OnInit, AfterViewChecked {

    addressForm: FormGroup;
    theId: string;
    theName: string;
    theAddressLine1: string;
    theAddressLine2: string;
    theCity: string;
    theState: string;
    theZip: number;
    currentAddress:string;
    theAddresses:Address[];
    currentMode: string;
    completionStatus: string;

    constructor(public formBuilder: FormBuilder, private httpService: HttpService) { }

    @Output() validationError: EventEmitter<boolean> = new EventEmitter<boolean>();
  
    ngAfterViewChecked(){

        this.addressForm.controls["addressList"].valueChanges
            .subscribe(data => this.setAddressFields(data, this.theAddresses));

            this.addressForm.statusChanges
                .subscribe(data => { 
                    this.validationError.emit(data != "VALID");
                })
    }
    
    ngOnInit() {

          this.buildForm();

          this.refreshAddressData();
    }
     
    refreshAddressData(addressToDisplay?:string, callback?){

        this.httpService.get<Address[]>('/api/addresses')
        .subscribe(addresses=>{
            this.theAddresses = addresses;
            if (this.theAddresses.length > 0){
                this.setAddressFields(addressToDisplay == null ? this.theAddresses[0].name : addressToDisplay, 
                     this.theAddresses);
                if (callback)     
                    callback();
            }
        });

    }  
 
    getErrors(theControl:string){

        let errList:string[] = [];
        let messages = this.validationMessages[theControl];
        let control = this.addressForm.controls[theControl];

        if (messages && control){
            for (const key in control.errors){
                errList.push(messages[key]);
            }
        }
     
        return errList;
    }

    buildForm(){
        this.addressForm = this.formBuilder.group({
            'addressList':      [],
            'name':             [this.theName, [Validators.required, AlphaNumericValidator()] ],
            'addressLine1':     [this.theAddressLine1, Validators.required],
            'addressLine2':     [this.theAddressLine2],
            'city':             [this.theCity, Validators.required],
            'state':            [this.theState, Validators.required],
            'zip':              [this.theZip,  [Validators.required, NumericValidator()], this.validateZipCode() ]
        });
        
     }
 
    validateZipCode()   {
 
        return ((x : AbstractControl) : Observable<ValidationErrors>  => {

                let theError:ValidationErrors = null;

                console.log("calling api for: " + x.value);
                return this.httpService.get<ZipCode>('/api/zipCodes/' + x.value)
                    .map((zip) => {

                        if (zip){
                           this.theCity = zip.city;
                           this.theState = zip.state;
                         }
                        else{
                            this.theCity = "";
                            this.theState = "";
                            theError = {"invalidZip": x.value};
                         }  

                        return theError;
                    });
    
        });
    }

    setAddressFields(selectedAddressName, addresses:Address[]){

        this.completionStatus = "";
        this.currentAddress = selectedAddressName;
        var selectedAddress = addresses.filter(x => x.name == selectedAddressName)[0];

        if (selectedAddress){
            this.theId = selectedAddress._id;
            this.theName = selectedAddress.name;
            this.theAddressLine1 = selectedAddress.line1;
            this.theAddressLine2 = selectedAddress.line2;
            this.theCity = selectedAddress.city;
            this.theState = selectedAddress.state;
            this.theZip = selectedAddress.zip;

            this.addressForm.markAsPristine();
            this.currentMode = "update";
        }else{
            this.newAddress();
         }
    }

    newAddress(){
        this.theId = null;
        this.theName = "";
        this.theAddressLine1 = "";
        this.theAddressLine2 = "";
        this.theCity = "";
        this.theState = "";
        this.theZip = null;

        this.addressForm.markAsPristine();
        this.currentMode = "insert";
     }

    cancel(){
        this.addressForm.markAsPristine();
        this.setAddressFields(this.currentAddress, this.theAddresses);
    }

    getFormData(){
        return new Address(
            this.theId,
            this.theName,
            this.theAddressLine1,
            this.theAddressLine2,
            this.theCity,
            this.theState,
            this.theZip);
    }

    saveAddress(isNewAddress:boolean){

        if(this.addressForm.valid){

            var obs;

            if (isNewAddress)
                obs = this.httpService.post('/api/addresses/', this.getFormData());
            else
                obs = this.httpService.put('/api/addresses/', this.getFormData());
  
                obs.subscribe((address) => {
                     this.refreshAddressData(
                         address.name, 
                         () => { this.completionStatus = isNewAddress ? "inserted" : "updated"; });
                });
        }
    }

    validationMessages = {
        'name': {
                    'required': 'Name is required',
                    'invalidAlphaNumeric': 'Name must be alpha-numeric'
                },
        'addressLine1': {
                    'required': 'Address is required',
                },
        'city': {
                    'required': 'City is required'
                },
        'state': {
                    'required': 'State is required'
                 },
        'zip': {
                    'required': 'Zip Code is required',
                    'invalidZip': 'Invalid Zip Code',
                    'invalidNumeric': 'Zip Code must be numeric'
               }
    }

}