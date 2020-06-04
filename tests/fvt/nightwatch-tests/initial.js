

module.exports = {
    '@disabled': false,  // This will prevent the test module from running.
  
    after: (browser, done) => {
        console.log('After called')
      browser
        .closeWindow()
        .end(done);
    },

    'Navigate to the DemoDOI - valid city name': async (browser) => {
        const demodoi = browser.page.demodoi();
        const { cityName } = demodoi.section;
    
        await demodoi.navigate().waitForElementVisible('@inputText');

        await demodoi.setValue('@inputText', [
            'Auckland',
            browser.Keys.ENTER
          ]);
    
        await demodoi.waitForElementVisible('@table');

        cityName.expect.element('@firstApp').text.to.equal('Auckland');
    },

    'Navigate to the DemoDOI - invalid city name': async (browser) => {
        const demodoi = browser.page.demodoi();
    
        await demodoi.navigate().waitForElementVisible('@inputText');

        await demodoi.setValue('@inputText', [
            'Aucklan',
            browser.Keys.ENTER
          ]);
    
        await demodoi.waitForElementNotPresent('@table');

        demodoi.expect.element('@cityNotFound').text.to.equal('city not found');
    },

    'Navigate to the DemoDOI - invalid input': async (browser) => {
        const demodoi = browser.page.demodoi();
    
        await demodoi.navigate().waitForElementVisible('@inputText');

        await demodoi.setValue('@inputText', [
            '123456',
            browser.Keys.ENTER
          ]);
    
        await demodoi.waitForElementNotPresent('@table');

        demodoi.expect.element('@invalidCity').text.to.equal('* Must be NZ city name only');
    },
};