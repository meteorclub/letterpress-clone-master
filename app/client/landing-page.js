Template.landingPage.helpers({
  content: function () {
    return Letterpress.Collections.Pages.findOne({path: '/'});
  },
  chapters: function () {
    return Letterpress.Collections.Pages.find({
      $or : [{template: 'chapter'},{template: 'video-chapter'}]
    }, {
      sort: {order: 1}
    });
  }
});
