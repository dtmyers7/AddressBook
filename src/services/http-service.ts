import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class HttpService {

    returnData:any;

    constructor(private http: HttpClient) {
    }
    
    get<T>(getUrl:string){
        return this.http.get<T>(getUrl)
        .map(data => {return data})
        .catch(err => {
            this.errorProcessing(err);
            return Observable.throw(err);
        });
        
    }
 
    post<T>(postUrl:string, data: T){
        return this.http.post<T>(postUrl, data)
        .map(data => {return data})
        .catch(err => {
            this.errorProcessing(err);
            return Observable.throw(err);
        });
    }
 
    put<T>(postUrl:string, data: T){
        return this.http.put<T>(postUrl, data)
        .map(data => {return data})
        .catch(err => {
            this.errorProcessing(err);
            return Observable.throw(err);
        });
    }
   
    errorProcessing(err){
        //error processing logic here...
    }
}