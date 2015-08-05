module.exports = function () {

  // var request = require('request');

  this.Given(/^I have configured a Stripe account$/, function (callback) {
    // do nothing, the step specification is valid but does not require automation
    callback();
  });

  this.Given(/^I have created content$/, function () {
    return this.server.call('fixtures/seedData');
  });

  this.Given(/^I have setup a "([^"]*)" payment plan$/, function (plan) {
    return this.server.call('fixtures/setPaymentPlan', plan);
  });

  this.When(/^a user pays using Stripe$/, function () {
    return this.browser.
      waitForExist('a[title="Buy It"]').
      click('a[title="Buy It"]');
  });

  this.Then(/^they see a confirmation screen of their "([^"]*)" purchase$/, function (plan) {
    var message;
    switch (plan) {
      case 'subscribe':
        message = 'You are now subscribed';
        break;
      case 'charge':
        message = 'You have completed your purchase';
        break;
    }
    // need a delay here
    return this.browser.
      waitForExist('h1').
      url().should.eventually.have.property('value').that.contains('/' + plan + '-confirmation').
      getText('body').should.eventually.contain(message);
  });

  this.Then(/^receive a confirmation email of their "([^"]*)" purchase$/, function () {
    var self = this;
    return self.server.call('fixtures/getSettings').then(function (settings) {
      return self.server.call('emailStub/getEmails').then(function (emails) {
        global.expect(emails[0].to).to.equal('me@example.com');
        global.expect(emails[0].from).to.equal(settings.private.emails.welcome.from);
        global.expect(emails[0].subject).to.equal(settings.private.emails.welcome.subject);
        global.expect(emails[0].text).to.contain(settings.private.emails.welcome.text);
      });
    });
  });
};
