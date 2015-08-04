module.exports = function () {

  var url = require('url');

  this.Given(/^I created a landing page$/, function () {
    this.thePage = '/';
    // a landing-page is setup in the seed data
    return this.server.call('fixtures/seedData');
  });

  this.When(/^a visitor navigates to the page$/, function () {
    return this.client.
      url(url.resolve(process.env.ROOT_URL, this.thePage)).
      waitForExist('body').
      waitForVisible('body');
  });

  this.Then(/^they see the cover image from "([^"]*)"$/, function (source) {
    return this.client.
      waitForExist('img').
      getAttribute('img', 'src').should.eventually.contain(source);
  });

  this.Then(/^they see the tag-line "([^"]*)"$/, function (tagline) {
    return this.client.
      waitForExist('p').
      getText('p em').should.become(tagline);
  });

};
