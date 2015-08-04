(function () {

  'use strict';

  module.exports = function () {

    this.Before(function () {
      return this.server.call('fixtures/reset');
    });

  }

})();