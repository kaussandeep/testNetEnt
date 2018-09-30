exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['test/first.spec.js'],
    capabilities: {
      browserName: 'chrome'
    }
  }