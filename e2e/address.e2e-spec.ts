import { browser } from 'protractor';
import { CodePage } from './code-page';

describe('Address Page', () => {
    let page: CodePage;

    beforeEach(async() => {
        page = new CodePage();
        await page.navigateTo();
    });
 
      afterEach(async() => {
          page.sleep(2000);
      })

    it("should load the start page.", async() => {
        const title = await page.getTitle();
        expect(title).toBe("Address Book");
    });

    it('should initialize zip field properly', async() => {
        const zipText = await page.getFieldValueById("zipcode");
        expect(zipText).toEqual("75043");
    });

    it('should Not display error message if no errors', async() => {
        const doesExist = await page.doesElementExist("sample-error")
        expect(doesExist).toBe(false);
    });

    it('should display error message if error found', async() => {
        await page.setValue("zipcode","000");
        const doesExist = await page.doesElementExist("sample-error")
        expect(doesExist).toBe(true);
    });
});