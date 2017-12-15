import { browser, by, element } from 'protractor';

export class CodePage {
  async navigateTo() {
    return await browser.get('/');
  }

  async getTitle() {
    return await browser.getTitle();
  }

  async getParagraphText() {
    return await element(by.css('app-root p')).getText();
  }

  async getElementById(theId:string) {
    return await element(by.id(theId));
  }

  async getInnerTextById(theId:string) {
    return await element(by.id(theId)).getText();
  }

  async getFieldValueById(theId:string) {
    var ele = element(by.id(theId));
    return await ele.getAttribute("ng-reflect-model");
  }

  async setValue(theId:string, theValue:string) {
    var ele = element(by.id(theId));
    ele.clear();
    return await ele.sendKeys(theValue);
  }

  async sleep(milliseconds:number){
    return await browser.sleep(milliseconds);
  }

  async doesElementExist(theId:string){
    var ele = element(by.id(theId));
    return await ele.isPresent();
  }
}
