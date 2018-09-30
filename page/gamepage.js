'use strict';

const EC = protractor.ExpectedConditions;
const timeout = 10000;

class GamePage {
async get() 
{    
  await browser.get('http://127.0.0.1:8000/', 60 * 1000);
 };
 async screenshot() {
  browser.takeScreenshot().then(function (png) {
    writeScreenShot(png, 'start.png');
});
}
}


  module.exports = GamePage;