exports.config = {
  onPrepare: function() {
    const protractorImageComparison = require('protractor-image-comparison');
    browser.protractorImageComparison = new protractorImageComparison(
        {
            baselineFolder: 'baseline/',
            screenshotPath: 'screenshots/'
        }
    );
},
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['test/first.spec.js'],
    capabilities: {
      browserName: 'chrome'
    }
  }