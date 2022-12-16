App.controller("home", function (page) {
  // put stuff here
});

App.controller("page2", function (page) {
  // put stuff here
  if (page) {
    getMapLocation();
  }

  function onSuccess(position) {
    $(".location").text(
      `Latitude: ${position.coords.latitude} and Longitude: ${position.coords.longitude}`
    );
  }
  function onError(error) {
    $(".location").text(`code: ${error.code} message: ${error.message}`);
  }
  function getMapLocation() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
});

App.controller("page3", function (page) {
  // put stuff here
  const rootUrl = "https://tolulopebamisile.000webhostapp.com/";

  const url = `${rootUrl}/wp-json/wp/v2/posts`;

  if (page) {
    loadData();
  }
  function loadData() {
    $.getJSON(url, function (data) {
      console.log(data);
      $(".main").empty();

      for (let i = 0; i < data.length; i++) {
        const div = document.createElement("div");
        div.innerHTML = `
 <div class="card-p1">
 <div class="card-body">
 <h4 class="card-title">${data[i].title.rendered}</h4>
 <p class="card-text textwrap">${data[i].content.rendered}</p>
 </div>
 </div>
 `;
        $(".main").append(div);
      }
    });
  }
});

try {
  App.restore();
} catch (err) {
  App.load("home");
}
