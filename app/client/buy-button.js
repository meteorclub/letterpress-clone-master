console.log('Loading buy-button.js');

Template.landingPage.events({
  // any link with the word "buy" in it will trigger a purchase
  'click a:contains("Buy"), click a:contains("buy"), click a:contains("BUY")': function () {
    console.log('Calling purchase');
    Letterpress.Services.Buy.purchase();
  }
});
