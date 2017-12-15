// import { inject, fakeAsync, async, TestBed } from '@angular/core/testing';
// import { HttpClient, HttpHeaders } from '@angular/common/http'

// import {ErrorHandler} from './error-handler';
// import { HttpRequest } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import { HttpEvent } from '@angular/common/http';
// import { HttpResponse } from '@angular/common/http';
// import { HttpHandler } from '@angular/common/http';
// import { Address } from 'model/address';

// class mockHttpHandler{

//     handle(req: HttpRequest<any>): Observable<HttpEvent<any>>{
//         let address = new Address("","","","","","",0);
//         let response = new HttpResponse({body: address, status:200, statusText:"success"})
//         return Observable.of(response);
//     }
// }

// describe('Error Handler', () => {

//     let mockHttpRequest = new HttpRequest("GET","/GetData");

//     beforeEach( () => {
//         TestBed.configureTestingModule({
//             providers: [ErrorHandler]
//         })
//     });

//     let errorHandler = new ErrorHandler();

//     it("Should capture error event", ()  => {

//         errorHandler.intercept(mockHttpRequest, new mockHttpHandler());

//         expect(errorHandler.internalEvent).not.toBeNull();      
//      });

  
// });