(function () {

  'use strict';

  module.exports = function () {

    this.Before(function (callback) {

      var self = this;
      self.server.call('fixtures/reset').then(function () {
        self.server.call('emailStub/reset').then(function () {
          self.server.call('emailStub/stub').then(function () {
            // go to the page first so we have access to the Meteor object
            self.browser.url(process.env.ROOT_URL).
              executeAsync(function (done) {

                var customer = {
                  id: 'randomId',
                  email: 'me@example.com',
                  subscriptions: {
                    data: [{
                      current_period_start: 1436716844,
                      current_period_end: 1436716844
                    }]
                  }
                };

                Meteor.call('stripeStub/stub', customer, done);
              }).
              call(callback);
          });
        });

      });

    });
  }
})();
