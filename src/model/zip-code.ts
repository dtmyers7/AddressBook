import { Injectable } from '@angular/core';

@Injectable()
export class ZipCode {
    constructor(    
        public city:string,
        public state:string,
        public zip:number){

    }

}