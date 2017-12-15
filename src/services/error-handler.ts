// import 'rxjs/add/operator/do';
// import { HttpInterceptor } from '@angular/common/http';
// import { HttpRequest } from '@angular/common/http';
// import { HttpHandler } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import { HttpEvent } from '@angular/common/http';
// import { HttpResponse } from '@angular/common/http';


// export class ErrorHandler implements HttpInterceptor {
 
//   internalEvent  = null;

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
//     return next
//       .handle(req)
//       .do(event => {
//         if (event instanceof HttpResponse) {
//             if (event.status != 200){
//                 //Do Error Handling...
//                 this.internalEvent = event;
//             }
//         }
//       },
//     err => {
//         this.internalEvent = err;
//     });
//   }
// }