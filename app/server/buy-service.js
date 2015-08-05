Stripe = StripeAPI(process.env.STRIPE_SECRET_KEY || Meteor.settings.private.stripe.secretKey);

Letterpress.Services.Buy = {
  charge: function (token) {                                                                                                                         [100/428]

    var request = {
      source: token.id,
      amount: Meteor.settings.public.price,
      currency: Meteor.settings.public.currency
    };

    var stripeChargeCreateSync = Meteor.wrapAsync(Stripe.charges.create, Stripe.charges);
    var charge;
    try {
      charge = stripeChargeCreateSync(request);
    } catch (error) {
      throw new Meteor.Error(1001, error.message);
    }

    Letterpress.Services.Account.createAccount(token.email);
  }
};
