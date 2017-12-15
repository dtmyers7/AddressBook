import { inject, fakeAsync, async, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import {ZipCode} from '../model/zip-code';
import {Address} from '../model/address';
import {HttpService} from './http-service';
import { HttpTestingController } from '@angular/common/http/testing';

class MockHttpData {
        static testZips = [
            new ZipCode("Dallas","TX",75000), 
            new ZipCode("Chicago","IL",60609) ];
    
        static testAddresses = [
            new Address("1","Address1","line1","line2","Dallas","TX",75000), 
            new Address("2","Address2","line1","line2","Chicago","IL",60609), 
            new Address("3","Address3","line1","line2","Beverly Hills","CA",90210) ];
    }


describe('Workout Service', () => {
    let httpService:HttpService;

    beforeEach( async(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ HttpService ]
        })
    }));

    it("GET should return Observable<T>", 
                                    inject([HttpService, HttpClient, HttpTestingController], 
                                            (service: HttpService, http: HttpClient, httpMock: HttpTestingController)  => {

        service.get<ZipCode[]>("/getZips")
            .subscribe(zips => {
                    expect(zips.length).toEqual(2);
            });  

        const req = httpMock.expectOne("/getZips");
        expect(req.request.method).toEqual('GET');      
        req.flush(MockHttpData.testZips);
        
        // Finally, assert that there are no outstanding requests.
        httpMock.verify();
    }));

    it("POST should return Observable<T>", 
                                inject([HttpService, HttpClient, HttpTestingController], 
                                    (service: HttpService, http: HttpClient, httpMock: HttpTestingController)  => {

        service.post<Address>("/addAddress", MockHttpData.testAddresses[0])
            .subscribe(address => {
                expect(address.name).toEqual("Address1");
        });  

        const req = httpMock.expectOne("/addAddress");
        expect(req.request.method).toEqual('POST');      
        req.flush(MockHttpData.testAddresses[0]);

        // Finally, assert that there are no outstanding requests.
        httpMock.verify();
    }));

    it("PUT should return Observable<T>", 
                            inject([HttpService, HttpClient, HttpTestingController], 
                                    (service: HttpService, http: HttpClient, httpMock: HttpTestingController)  => {
        
        service.put<Address>("/updateAddress", MockHttpData.testAddresses[0])
            .subscribe(address => {
                    expect(address.name).toEqual("Address1");
        });  

        const req = httpMock.expectOne("/updateAddress");
        expect(req.request.method).toEqual('PUT');      
        req.flush(MockHttpData.testAddresses[0]);

        // Finally, assert that there are no outstanding requests.
        httpMock.verify();
    }));

    it("Handles error response",
    inject([HttpService, HttpClient, HttpTestingController], 
        (service: HttpService, http: HttpClient, httpMock: HttpTestingController)  => {
            
            spyOn(service, "errorProcessing");
            service.get<ZipCode[]>("/getZips")
                .subscribe(
                    data =>{
                        expect(null).not.toBeNull("should not get here because error encountered")
                    },
                    err => {
                        expect(err.status).toBe(500);
                        expect(service.errorProcessing).toHaveBeenCalled();
                    }
                );
            
            const req = httpMock.expectOne("/getZips");
            req.flush(MockHttpData.testZips, { status: 500, statusText: 'Server Error'});
 
        // Finally, assert that there are no outstanding requests.
        httpMock.verify();
    }));

 
});