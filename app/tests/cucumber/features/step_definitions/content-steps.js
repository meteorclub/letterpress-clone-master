module.exports = function () {

  var url = require('url');

  this.Given(/^I created a landing page$/, function () {
    this.thePage = '/';
    // a landing-page is setup in the seed data
    return this.server.call('fixtures/seedData');
  });

  this.Given(/^I created a "([^"]*)" called "([^"]*)" at "([^"]*)" with the following markdown$/, function (template, title, path, markdown) {

    // store the path so humans can use "the page" natural language in future steps
    this.thePage = path;

    return this.server.call(
      'fixtures/page/create', {
        template: template,
        title: title,
        path: path,
        description: markdown
      });
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

  this.Then(/^they see the sub-heading "([^"]*)"$/, function (subHeading) {
    return this.client.
      waitForExist('h2=' + subHeading).
      isVisible('h2=' + subHeading);
  });

  this.Then(/^they see the tag-line "([^"]*)"$/, function (tagline) {
    return this.client.
      waitForExist('p').
      getText('p em').should.become(tagline);
  });

  this.Then(/^they can navigate to "([^"]*)" at "([^"]*)"$/, function (location, source) {
    return this.client.
      waitForExist('a[title="' + location + '"]').
      getAttribute('a[title="' + location + '"]', 'href').should.eventually.contain(source);
  });

  this.Then(/^they see the chapter "([^"]*)" in the table of contents with the description$/, function (title, text) {
    return this.client.
      waitForExist('//*[@class="chapter"]//a[contains(text(), "' + title + '")]').
      waitForExist('//*[@class="chapter"]//p[contains(text(), "' + text + '")]');
  });
};
