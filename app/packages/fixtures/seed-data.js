Letterpress.Utils.seedData = function () {

  Letterpress.Collections.Pages.insert({
    path: '/',
    template: 'landingPage',
    description: '' +
    '![Cover](/cover.jpg "Cover")' +
    '\n\n' +
    '*Learn how to do something*'

  });

};
