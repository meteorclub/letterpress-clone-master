Template.landingPage.helpers({
  chapters: function () {
    return Letterpress.Collections.Pages.find({template: 'chapter'});
  }
});
