App.controller("home", function (page) {
  // put stuff here
});

App.controller("page2", function (page) {
  // put stuff here
});

App.controller("page3", function (page) {
  // put stuff here
});

App.controller("page4", function (page) {
  // put stuff here
});

App.controller("page5", function (page) {
  // put stuff here
});

App.controller("page6", function (page) {
  // put stuff here
});

try {
  App.restore();
} catch (err) {
  App.load("home");
}
