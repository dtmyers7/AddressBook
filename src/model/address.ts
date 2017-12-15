import { Injectable } from '@angular/core';

@Injectable()
export class Address {
    constructor( 
        public _id:string,
        public name:string,
        public line1:string,
        public line2:string,   
        public city:string,
        public state:string,
        public zip:number){

    }

}