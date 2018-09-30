const EC = protractor.ExpectedConditions;
const GamePage = require('../page/gamepage');

describe('NetEnt Game Test Demo', () => {

  /*Essentially waiting for the element START button to appear here  */
  it('SPIN button should be visible', async () => {
      browser.ignoreSynchronization = true;
      const page = new GamePage();
    await  page.get();
     await browser.wait(EC.visibilityOf(element(By.id('start'))), 15000, 'Game view not visible ');
     console.log("1. SPIN Button check started");
     expect(element(by.id('start')).isPresent()).toBe(true);
    });
     
    /* Logic here is that when user clicks on SPIN button, the message changes from welcome to something else.
     So if welcome message is not there then we can assume start button has been successfully clicked */
  it('Verify user is able to click and CLICK button is working', async () => {
      browser.ignoreSynchronization = true;
      const page = new GamePage();
      await  page.get();    
      await browser.wait(EC.visibilityOf(element(By.id('start'))), 15000, 'Game view not visible ');
      console.log("2. Click on Button and wait for result");
      element(By.id('start')).click();
      await browser.wait(EC.visibilityOf(element(By.id('status'))), 15000, 'status not found');
     
      expect(element(By.id("status")).getText()).not.toEqual("Welcome");
    });

    it('Verify the right message is shown based on Win outcomes', async () => {
      browser.ignoreSynchronization = true;
      const page = new GamePage();
      await  page.get();
      await browser.wait(EC.visibilityOf(element(By.id('start'))), 15000, 'Game view not visible ');
      expect(element(by.id('start')).isPresent()).toBe(true);
      console.log("3. Check for right message for win");
      element(By.id('start')).click();
      
/* The logic applied here is that whenever there is a win, a new className 'pulse' is added to div. This class gives the animation effect.
Based on the count of these classes we can determine how big , small is the win  */
      var containerDiv = element(By.id("result"));
      var innerDivs = containerDiv.all(by.className('pulse'));
      innerDivs.count().then(function (count) {
      browser.sleep(3000);
     if (count == 0) {
       console.log("No Win, try again");       
       expect(element(By.id("status")).getText()).toEqual("No Win, try again.");
     } else if (count == 2) {
       console.log("Small Win, try again");       
       expect(element(By.id("status")).getText()).toEqual("Small win, try again to win more.");
     } else if (count == 3) {
       console.log("Big Win, congrats");       
       expect(element(By.id("status")).getText()).toEqual("Big win, congratulation.");
     }
   });
 });

});
