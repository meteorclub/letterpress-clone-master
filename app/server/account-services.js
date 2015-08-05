Letterpress.Services.Account = {

  createAccount: function (email, profile) {
    var newUserId = Accounts.createUser({email: email, profile: profile});
    Accounts.sendEnrollmentEmail(newUserId);
  }
};
