import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule,FormsModule,FormBuilder, ValidationErrors} from '@angular/forms';
import { AddressComponent } from './address.component';
import { Observable } from 'rxjs/Observable';
import {HttpService} from '../services/http-service';
import {ZipCode} from '../model/zip-code';
import {Address} from '../model/address';
import { fakeAsync, tick } from '@angular/core/testing';
import { inject } from '@angular/core/testing';
import 'rxjs/add/observable/of';

class MockHttpService {

    static testZips = [
        new ZipCode("Dallas","TX",75000), 
        new ZipCode("Chicago","IL",60609) ];

    static testAddresses = [
        new Address("1","Address1","line1","line2","Dallas","TX",75000), 
        new Address("2","Address2","line1","line2","Chicago","IL",60609), 
        new Address("3","Address3","line1","line2","Beverly Hills","CA",90210) ];
    
    get<T>(url: string) {
        if (url.indexOf("addresses") > -1)
            return Observable.of(MockHttpService.testAddresses);
        else{
            let zip = "";
            let zipCode = null;

            if (url.lastIndexOf("/") > -1)
                zip = url.substring(url.lastIndexOf("/")+1);

            let zipCodes =  MockHttpService.testZips.filter(function(z){ return (String(z.zip) == zip); });
            if (zipCodes.length > 0)
                zipCode = zipCodes[0];
            return Observable.of(zipCode);
        }
    }

    post(url: string, data: any){
        return Observable.of(MockHttpService.testAddresses[0])
    }

    put(url: string, data: any){
        return Observable.of(MockHttpService.testAddresses[0])
    }
}

describe('Address Component', () => {

    let fixture:ComponentFixture<AddressComponent>;
    let runner:AddressComponent;

    beforeEach( async(() => {
        TestBed.configureTestingModule({
            declarations: [ AddressComponent ],
            imports: [ReactiveFormsModule, FormsModule],
            providers: [FormBuilder,
                        {provide: HttpService, useClass: MockHttpService}],
            schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents()
        .then(() => {
                fixture = TestBed.createComponent(AddressComponent);
                runner = fixture.componentInstance;
            }); 
    }))

    it('should create the component', () => {
        expect(runner instanceof AddressComponent).toBe(true, 'should create AddressComponent');
    });

    it('should create Reactive Form during initializaion', () => {
        runner.ngOnInit();
        expect(runner.addressForm).toBeDefined();
    });

    it('should get all addresses during initializaion', async(() => {
        runner.ngOnInit();
        fixture.whenStable().then(()=>{
           expect(runner.theAddresses.length).toEqual(MockHttpService.testAddresses.length);
        })
    }));

    it('should display 1st addresses during initializaion', fakeAsync(() => {
        runner.ngOnInit();
        tick(); 
        expect(runner.currentAddress).toEqual("Address1");
    }));

    it('should detect all form errors', fakeAsync(() => {

        runner.ngOnInit();
        let zipControl = runner.addressForm.controls["zip"];
        zipControl.setErrors({"required": true, "invalidZip": 99999});
        let zipControlErrors = runner.getErrors("zip");
        expect(zipControlErrors.length).toEqual(2);
    }));

    it('zip code validator returns null if zip code is valid', fakeAsync(() => {
        
        runner.ngOnInit();
        let zipControl = runner.addressForm.controls["zip"];
        zipControl.setValue(75000);
        let zipCodeAsyncValidatorFunction = runner.validateZipCode();
        zipCodeAsyncValidatorFunction(zipControl)
            .subscribe((validationError) => { expect(validationError).toBeNull(); });
     
        expect(runner.theCity).toBe("Dallas");
        expect(runner.theState).toBe("TX");
        }));

    it('zip code validator returns ValidationErrors if zip code is invalid', fakeAsync(() => {
        
        runner.ngOnInit();
        let zipControl = runner.addressForm.controls["zip"];
        zipControl.setValue(75001);
        let zipCodeAsyncValidatorFunction = runner.validateZipCode();
        zipCodeAsyncValidatorFunction(zipControl)
            .subscribe((validationError) => { expect(validationError).toBeTruthy(); });
     
        expect(runner.theCity).toBe("");
        expect(runner.theState).toBe("");
       }));
 

    it('POST called on Insert', inject([HttpService], (http: HttpService) => {
        
        spyOn(http, "post").and.callThrough();
        spyOn(http, "put").and.callThrough();
        
        runner.ngOnInit();
        //set to valid data, so the form is VALID
        runner.addressForm.setValue({addressList: null, name: 'name', addressLine1: 'addressLine1', addressLine2: "", city: "city", state:"state", zip:75000});
        runner.saveAddress(true);

        expect(http.post).toHaveBeenCalled();
        expect(http.put).toHaveBeenCalledTimes(0);
       }));


    it('PUT called on Update', inject([HttpService], (http: HttpService) => {
        
        spyOn(http, "post").and.callThrough();
        spyOn(http, "put").and.callThrough();

        runner.ngOnInit();
        //set to valid data, so the form is VALID
        runner.addressForm.setValue({addressList: null, name: 'name', addressLine1: 'addressLine1', addressLine2: "", city: "city", state:"state", zip:75000});
        runner.saveAddress(false);

        expect(http.put).toHaveBeenCalled();
        expect(http.post).toHaveBeenCalledTimes(0);
        
       }));
       
});