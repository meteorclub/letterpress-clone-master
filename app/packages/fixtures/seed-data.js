Letterpress.Utils.seedData = function () {

  Letterpress.Collections.Pages.insert({
    path: '/',
    template: 'landingPage',
    description: '' +
    '![Cover](/cover.jpg "Cover")' +
    '\n\n' +
    '*Learn how to do something*' +
    '\n\n' +
    '[Buy It](# "Buy It")'
  });

  Letterpress.Collections.Pages.insert({
    title: 'Charge Confirmation',
    template: 'info',
    path: '/charge-confirmation',
    description: '' +
    '##Thank you for your purchase. You have completed your purchase' +
    '\n\n' +
    '[Home](/ "Home")'
  });
};
